import { useLayoutEffect, useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Row } from 'reactstrap';
import omit from 'lodash/omit';

import Form from '../form/Form';
import { StepType } from '../steps/step/Step';
import { WinterStorageMethod } from '../../__generated__/globalTypes';
import './wizard.scss';
import PrivacyPoliciesAgreement from '../agreement/PrivacyPoliciesAgreement';

type Props = {
  children: React.ReactNode;
  gdprNotes?: React.ReactNode;
  currentStep: number;
  goBackward: Function;
  goForward: Function;
  initialValues: {
    [key: string]: unknown;
    boatStoredOnTrailer?: boolean;
    storageMethod?: unknown;
  };
  steps: StepType[];
  stepsBeforeForm: number;
  submit: Function;
};

const Wizard = ({
  children,
  gdprNotes,
  currentStep,
  goBackward,
  goForward,
  initialValues: _initialValues,
  steps,
  stepsBeforeForm,
  submit,
}: Props) => {
  const { t } = useTranslation();
  useLayoutEffect(() => window.scrollTo(0, 0), []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suggest using trail option if have no selected data.
  const { boatStoredOnTrailer: onTrailer, storageMethod: currentStorageMethod } = _initialValues;
  const initialValues =
    onTrailer && !currentStorageMethod
      ? { ..._initialValues, storageMethod: WinterStorageMethod.ON_TRAILER }
      : _initialValues;

  const isLastFormStep = (step: number) => {
    return step + 1 === steps.length;
  };

  const isFirstFormStep = (step: number) => {
    return step === stepsBeforeForm;
  };

  const focusFirstPageElement = () => {
    const mainLink = document.getElementById('main-link');
    if (mainLink) {
      mainLink.focus();
    }
  };

  const handlePrevious = (values: {}) => {
    if (!isFirstFormStep(currentStep)) {
      focusFirstPageElement();
    }
    goBackward(values);
  };

  const handleSubmit = (values: { boatId?: string }) => {
    if (isLastFormStep(currentStep)) {
      setIsSubmitting(true);

      let apiValues = values;

      if (values.boatId) {
        // In case the user has opted to use an existing boat, don't pass other
        // boat related fields than boatId, as the API does not accepts such
        // a request.
        apiValues = omit(values, [
          'boatDraught',
          'boatLength',
          'boatModel',
          'boatName',
          'boatType',
          'boatWeight',
          'boatWidth',
        ]);
      }

      submit(apiValues);
    } else {
      window.scrollTo(0, 0);
      focusFirstPageElement();
      goForward(values);
    }
  };

  const getSubmitText = (invalid: boolean) => {
    if (isLastFormStep(currentStep)) return 'form.wizard.button.submit';
    if (invalid) return 'form.wizard.button.invalid';
    return 'form.wizard.button.next';
  };

  const formContentComponent = React.Children.toArray(children)[0];

  const confirmGdprPrivacyPolicies = isLastFormStep(currentStep);
  const gdprColProps = { lg: { size: 10, offset: 1 }, xl: { size: 8, offset: 2 } };
  // FIXME
  /* eslint-disable react/no-unused-prop-types */
  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit}>
      {({ invalid, values }: { invalid: boolean; values: {} }) => (
        <div className={`vene-form-container${!!gdprNotes && '__without-bottom-margin'}`}>
          {React.isValidElement(formContentComponent) &&
            React.cloneElement<{ values?: {} }>(formContentComponent, { values })}
          {!!gdprNotes && (
            <Container>
              {confirmGdprPrivacyPolicies ? (
                <PrivacyPoliciesAgreement
                  colProps={gdprColProps}
                  label={
                    <span className="vene-formfield__label is-required">
                      {t('form.gdpr.privacyPoliciesAgreement.label')}
                    </span>
                  }
                  gdprNotes={gdprNotes}
                />
              ) : (
                <Row>
                  <Col {...gdprColProps}>{gdprNotes}</Col>
                </Row>
              )}
            </Container>
          )}
          <div className="vene-form__wizard-wrapper">
            <Container>
              <Row>
                <Col xs={12} className="vene-form__wizard-wrapper__button-group">
                  <Button color="link" type="button" onClick={() => handlePrevious(values)}>
                    <span>{t('form.wizard.button.previous')}</span>
                  </Button>
                  <Button type="submit" outline={!isLastFormStep(currentStep)} color="primary" disabled={isSubmitting}>
                    <span>{t(getSubmitText(invalid))}</span>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </Form>
  );
};

export default Wizard;
