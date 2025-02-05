import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';

import Layout from '../../../common/layout/Layout';
import './paymentPage.scss';
import { Checkbox } from '../../../common/fields/Fields';
import { ContractAuthMethods_contractAuthMethods as ContractAuthMethods } from '../../__generated__/ContractAuthMethods';
import Form from '../../../common/form/Form';
import AuthButton from './authButton/AuthButton';
import { TContext } from '../../../common/types/translation';

export interface Props {
  orderNumber: string;
  orderProductDetails: React.ReactNode;
  contractAuthMethods: ContractAuthMethods[];
  tContext: TContext;
  handleSign: (authMethod: string) => void;
  handleTerminate: () => void;
}

const PaymentPage = ({
  contractAuthMethods,
  orderProductDetails,
  orderNumber,
  tContext,
  handleSign,
  handleTerminate,
}: Props) => {
  const { t } = useTranslation();
  const [termsOpened, setTermsOpened] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  return (
    <Layout>
      <div id="vene-payment-page" className="vene-payment-page">
        <div className="vene-payment-page__content-container">
          <div className="vene-payment-page__content">
            <h2>{t('page.contract.title')}</h2>
            <p>{t('page.contract.info')}</p>
            <p className="vene-payment-page__contact-info">
              {t('page.contract.questions')}&nbsp;
              <a
                href="mailto:venepaikkavaraukset@hel.fi"
                rel="noopener noreferrer"
                target="_blank"
                className="vene-payment-page__link"
              >
                venepaikkavaraukset@hel.fi
              </a>
            </p>
          </div>
        </div>
        <div className="vene-payment-page__content-container">
          <div className="vene-payment-page__content vene-payment-page__accept-terms-content">
            {orderProductDetails}
            <div>
              <h3 className="vene-payment-page__subheading">
                {t('page.contract.read_and_approve', { context: tContext })}
              </h3>
              <p className="vene-payment-page__notice">{t('page.contract.terms_notice')}</p>
              <a
                href={`${process.env.REACT_APP_API_URL_ROOT}contract_document/${orderNumber}`}
                className="vene-payment-page__link"
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => setTermsOpened(true)}
              >
                {t('page.contract.terms_pdf')}
              </a>
            </div>

            <Form
              onSubmit={(values: { accepted: boolean }) => setTermsAccepted(values.accepted)}
              initialValues={{ accepted: false }}
            >
              {({ values }) => (
                <div>
                  <Checkbox
                    name={`accepted`}
                    label="page.contract.terms_checkbox"
                    value="accepted"
                    disabled={!termsOpened || termsAccepted}
                    required
                  />
                  {!termsAccepted && (
                    <Button type="submit" color="primary" disabled={!values.accepted}>
                      {t('page.contract.terms_form_submit')}
                    </Button>
                  )}
                </div>
              )}
            </Form>

            <div>
              <p>{t('page.contract.termination_note', { context: tContext })}</p>
              <Button color="danger" onClick={handleTerminate} outline>
                {t('page.contract.terminate', { context: tContext })}
              </Button>
            </div>

            {termsAccepted && (
              <div>
                <h3>{t('page.contract.select_signing_provider')}</h3>
                <div className="vene-payment-page__signing-providers">
                  {contractAuthMethods.map((method, key) => (
                    <AuthButton
                      key={key}
                      name={method.name}
                      identifier={method.identifier}
                      image={method.image}
                      onClick={() => handleSign(method.identifier)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
