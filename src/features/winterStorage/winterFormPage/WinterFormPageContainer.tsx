import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { compose } from 'recompose';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { onSubmitWinterForm } from '../../../redux/actions/FormActions';
import { WinterAreasQuery } from '../../__generated__/WinterAreasQuery';
import { getSelectedResources, stringToFloat } from '../../../common/utils/applicationUtils';
import { LocalePush, withMatchParamsHandlers } from '../../../common/utils/container';
import { CREATE_WINTER_STORAGE_APPLICATION, PROFILE_PAGE_QUERY, WINTER_AREAS_QUERY } from '../../queries';
import ApplicantDetails from '../../../common/applicantDetails/ApplicantDetails';
import WinterBoatDetails from '../../../common/winterBoatDetails/WinterBoatDetails';
import { getWinterStorageAreas } from '../utils';
import WinterOverview from './overview/WinterOverview';
import FormPage from '../../../common/formPage/FormPage';
import { Store } from '../../../redux/types';
import { WinterFormValues } from '../types';
import { SubmitWinterStorage, SubmitWinterStorageVariables } from '../../__generated__/SubmitWinterStorage';
import { SelectedIds } from '../../../common/types/resource';
import { StepType } from '../../../common/steps/step/Step';
import { ProfilePageQuery } from '../../__generated__/ProfilePageQuery';
import { getFormValuesFromProfile } from '../../profile/utils';

type Props = {
  winterValues: WinterFormValues;
  selectedAreas: SelectedIds;
  onSubmit: (values: WinterFormValues) => void;
  localePush: LocalePush;
} & RouteComponentProps<{ tab: string }>;

const stepsBeforeForm = 2;
const boatTabs = ['registered-boat', 'unregistered-boat', 'no-boat'];
const applicantTabs = ['private-person', 'company'];
const formTabs = [boatTabs, applicantTabs, ['overview']];

const WinterFormPageContainer = ({
  selectedAreas,
  winterValues,
  localePush,
  match: {
    params: { tab },
  },
  onSubmit,
  ...rest
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [boatTab, setBoatTab] = useState(boatTabs[0]);
  const [applicantTab, setApplicantTab] = useState(applicantTabs[0]);

  useEffect(() => {
    const currStep = Math.max(stepsBeforeForm, findIndex(formTabs, (s) => s.includes(tab)) + stepsBeforeForm);
    setCurrentStep(currStep);
    if (currStep === 2) {
      setBoatTab(tab);
    }
    if (currStep === 3) {
      setApplicantTab(tab);
    }
  }, [tab]);

  const { loading, data } = useQuery<WinterAreasQuery>(WINTER_AREAS_QUERY);
  const [submitWinterStorage] = useMutation<SubmitWinterStorage, SubmitWinterStorageVariables>(
    CREATE_WINTER_STORAGE_APPLICATION
  );
  const { data: profileData, loading: profileLoading } = useQuery<ProfilePageQuery>(PROFILE_PAGE_QUERY);

  const initialValues = { ...winterValues, ...getFormValuesFromProfile(profileData) };
  const boatTypes = data ? data.boatTypes : [];
  const areas = getWinterStorageAreas(data);
  const selected = getSelectedResources(selectedAreas, areas);

  const steps: StepType[] = [
    {
      completed: true,
      current: false,
      label: 'site.steps.winter_areas',
      linkTo: `winter-storage`,
    },
    {
      completed: true,
      current: false,
      label: 'site.steps.review_areas',
      linkTo: `winter-storage/selected`,
    },
    {
      completed: currentStep > 2,
      current: currentStep === 2,
      label: 'site.steps.boat_information',
      legend: {
        title: 'legend.boat.title',
        legend: 'legend.boat.legend',
      },
      linkTo: `winter-storage/form/${boatTab}`,
    },
    {
      completed: currentStep > 3,
      current: currentStep === 3,
      label: 'site.steps.applicant',
      legend: {
        title: 'legend.person.title',
        legend: 'legend.person.legend',
      },
      linkTo: `winter-storage/form/${applicantTab}`,
    },
    {
      completed: currentStep > 4,
      current: currentStep === 4,
      label: 'site.steps.send_application',
      legend: {
        title: 'legend.overview.title',
        legend: 'legend.overview.legend',
      },
      linkTo: 'winter-storage/form/overview',
    },
  ];

  const goBackward = (values: WinterFormValues) => {
    onSubmit(values);
    if (steps[currentStep - 1]) {
      localePush(steps[currentStep - 1].linkTo);
    }
  };

  const goForward = (values: WinterFormValues) => {
    onSubmit(values);
    if (steps[currentStep + 1]) {
      localePush(steps[currentStep + 1].linkTo);
    }
  };

  const submit = (values: WinterFormValues) => {
    onSubmit(values);

    const chosenAreas = selectedAreas
      .map((winterAreaId, priority) => ({
        winterAreaId,
        priority: priority + 1,
      }))
      .toArray();

    const normalizedValues = Object.assign({}, values, {
      boatWidth: stringToFloat(values.boatWidth),
      boatLength: stringToFloat(values.boatLength),
    });
    const allowedFormValues = omit(normalizedValues, 'boatStoredOnTrailer');

    const payload = {
      winterStorageApplication: {
        ...allowedFormValues,
        chosenAreas,
      },
    };

    submitWinterStorage({
      variables: {
        input: payload,
      },
    }).then(() => localePush('/thank-you'));
  };

  const getStepComponent = () => {
    switch (currentStep) {
      case 2:
        return <WinterBoatDetails tab={boatTab} boatTypes={boatTypes} />;
      case 3:
        return <ApplicantDetails tab={applicantTab} />;
      case 4:
        return (
          !loading && <WinterOverview selectedAreas={selected} boatTypes={boatTypes} boatTab={boatTab} steps={steps} />
        );
    }
  };

  return (
    <FormPage
      currentStep={currentStep}
      initialValues={initialValues}
      goBackward={goBackward}
      goForward={goForward}
      steps={steps}
      stepsBeforeForm={stepsBeforeForm}
      submit={submit}
      loading={profileLoading}
      {...rest}
    >
      {getStepComponent()}
    </FormPage>
  );
};

export default compose<Props, Props>(
  withMatchParamsHandlers,
  connect(
    (state: Store) => ({
      winterValues: state.forms.winterValues,
      selectedAreas: state.winterAreas.selectedWinterAreas,
    }),
    { onSubmit: onSubmitWinterForm }
  )
)(WinterFormPageContainer);
