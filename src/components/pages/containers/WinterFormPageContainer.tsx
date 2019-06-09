import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';

import omit from 'lodash/omit';
import { onSubmitWinterForm as onSubmit } from '../../../redux/actions/FormActions';
import { LocalePush, withMatchParamsHandlers } from '../../../utils/container';
import { CREATE_WINTER_STORAGE_RESERVATION, WINTER_AREAS_QUERY } from '../../../utils/graphql';
import FormPage from '../FormPage';

import ApplicantDetails from '../../forms/sections/ApplicantDetails';
import BoatDetails from '../../forms/sections/BoatDetails';
import Overview from '../../forms/sections/Overview';
import WinterAreasQuery from '../../query/WinterAreasQuery';

import { Store } from '../../../redux/types';
import { FormMode } from '../../../types/form';
import { Berths } from '../../berths/types';
import { StepType } from '../../steps/step/Step';

type Props = {
  initialValues: {};
  selectedBerths: Berths;
  onSubmit: Function;
  localePush: LocalePush;
  step: number;
} & RouteComponentProps<{ tab: string }>;

const mapSteps = [
  ['registered-boat', 'unregistered-boat', 'no-boat'],
  ['private-person', 'company'],
  ['overview']
];

const WinterFormPageContainer = ({
  selectedBerths,
  localePush,
  match: {
    params: { tab }
  },
  ...rest
}: Props) => {
  const [step, setStep] = useState(0);
  const [boatTab, setBoatTab] = useState(mapSteps[0][0]);
  const [applicantTab, setApplicantTab] = useState(mapSteps[1][0]);

  useEffect(() => {
    const currStep = Math.max(0, findIndex(mapSteps, s => s.includes(tab)));
    setStep(currStep);
    if (currStep === 0) {
      setBoatTab(tab);
    }
    if (currStep === 1) {
      setApplicantTab(tab);
    }
  });

  const steps: StepType[] = [
    {
      key: 'winter_areas',
      completed: true,
      current: false,
      linkTo: `winter-storage`
    },
    {
      key: 'review_areas',
      completed: true,
      current: false,
      linkTo: `winter-storage/selected`
    },
    {
      key: 'boat_information',
      completed: step > 0,
      current: step === 0,
      linkTo: `winter-storage/form/${boatTab}`
    },
    {
      key: 'applicant',
      completed: step > 1,
      current: step === 1,
      linkTo: `winter-storage/form/${applicantTab}`
    },
    {
      key: 'send_application',
      completed: step > 2,
      current: step === 2,
      linkTo: `winter-storage/form/${mapSteps[2][0]}`
    }
  ];

  return (
    <WinterAreasQuery query={WINTER_AREAS_QUERY}>
      {({
        loading,
        // error, TODO: handle errors
        data,
        client
      }) => {
        const boatTypes = data ? data.boatTypes : [];
        const goForward = async (values: {}) => {
          await onSubmit(values);

          const chosenAreas = selectedBerths
            .map((harbor, priority) => ({
              winterAreaId: harbor.id,
              priority: priority + 1
            }))
            .toArray();

          const allowedFormValues = omit(values, 'boatStoredOnTrailer');
          // Omit boatStoredOnTrailer checkbox out of form data when submit.

          await client.mutate({
            variables: {
              reservation: {
                chosenAreas,
                acceptBoatingNewsletter: false,
                acceptFitnessNews: false,
                acceptLibraryNews: false,
                acceptOtherCultureNews: false,
                ...allowedFormValues
              }
            },
            mutation: CREATE_WINTER_STORAGE_RESERVATION
          });

          await localePush('/thank-you');
        };

        const goBackwards = async (values: {}) => {
          await onSubmit(values);
          await localePush(steps[1].linkTo);
        };

        const goToStep = (nextStep: number) => (values: {}) => {
          onSubmit(values);
          localePush(steps[nextStep + 2].linkTo);
        };

        return (
          <FormPage
            goForward={goForward}
            goBackwards={goBackwards}
            nextStep={goToStep(step + 1)}
            prevStep={goToStep(step - 1)}
            onSubmit={onSubmit}
            step={step}
            steps={steps}
            {...rest}
          >
            <BoatDetails tab={boatTab} values={{}} boatTypes={boatTypes} mode={FormMode.Winter} />
            <ApplicantDetails tab={applicantTab} />
            {!loading && (
              <Overview
                selectedBerths={selectedBerths}
                boatTypes={boatTypes}
                boatTab={boatTab}
                steps={steps}
                mode={FormMode.Winter}
              />
            )}
          </FormPage>
        );
      }}
    </WinterAreasQuery>
  );
};

export default compose<Props, {}>(
  withMatchParamsHandlers,
  connect(
    (state: Store) => ({
      initialValues: state.forms.winterValues,
      selectedBerths: state.winterAreas.selectedWinterAreas
    }),
    { onSubmit }
  )
)(WinterFormPageContainer);
