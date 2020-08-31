import get from 'lodash/get';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { submitApplicationForm as submitExchangeForm } from '../../../redux/actions/ApplicationActions';
import { deselectBerth, moveDown, moveUp } from '../../../redux/actions/BerthActions';
import { BoatTypesBerthsQuery } from '../../../utils/__generated__/BoatTypesBerthsQuery';
import { getBerthFilterByValues, getResources, getSelectedResources } from '../../../utils/berths';
import { LocalePush, withMatchParamsHandlers } from '../../../utils/container';
import SelectedBerthPage from './SelectedBerthPage';

import { Store } from '../../../redux/types';
import { SelectedServices } from '../../../types/services';
import { SelectedIds } from '../../berths/types';

import { BerthFormValues } from '../../../types/berth';
import { BOAT_TYPES_BERTHS_QUERY } from '../../../utils/graphql';
import { StepType } from '../../steps/step/Step';
import { Query } from 'react-apollo';

interface Props {
  selectedBerths: SelectedIds;
  selectedServices: SelectedServices;
  localePush: LocalePush;
  values: BerthFormValues;
  berthsApplicationType: string;
  initialValues: BerthFormValues;
  submitExchangeForm(values: BerthFormValues): void;
  deselectBerth(id: string): void;
  moveUp(id: string): void;
  moveDown(id: string): void;
}

const steps: StepType[] = [
  {
    completed: true,
    current: false,
    label: 'site.steps.berths',
    linkTo: `berths`,
  },
  {
    completed: false,
    current: true,
    label: 'site.steps.selected_berths',
    linkTo: '',
  },
  {
    completed: false,
    current: false,
    label: 'site.steps.boat_information',
    linkTo: '',
  },
  {
    completed: false,
    current: false,
    label: 'site.steps.applicant',
    linkTo: '',
  },
  {
    completed: false,
    current: false,
    label: 'site.steps.send_application',
    linkTo: '',
  },
];

const UnconnectedSelectedBerthPage = ({
  localePush,
  values,
  selectedServices,
  selectedBerths,
  ...rest
}: Props) => {
  const moveToForm = async () => {
    await localePush('/berths/form/registered-boat');
  };
  const handlePrevious = async () => {
    await localePush('/berths');
  };

  return (
    <Query<BoatTypesBerthsQuery> query={BOAT_TYPES_BERTHS_QUERY}>
      {({
        loading,
        // error, TODO: handle errors
        data,
      }) => {
        const berths = getResources(data ? data.harbors : null);
        const selected = getSelectedResources(selectedBerths, berths);
        const boatTypes = !loading && data ? data.boatTypes : [];
        const type = get(values, 'boatType');
        const width = get(values, 'boatWidth', '');
        const length = get(values, 'boatLength', '');
        const boatType = boatTypes ? boatTypes.find((t) => !!t && t.id === type) : undefined;
        const boatTypeName = boatType && boatType.name;
        const filter = getBerthFilterByValues(values, selectedServices);
        const validSelection = selected.every(filter);

        return (
          <SelectedBerthPage
            boatInfo={{ width, length, boatType: boatTypeName }}
            handlePrevious={handlePrevious}
            moveToForm={moveToForm}
            filter={filter}
            validSelection={validSelection}
            steps={steps}
            legend={{
              title: 'legend.selected_berths.title',
              legend: 'legend.selected_berths.legend',
            }}
            selectedBerths={selected}
            values={values}
            berths={berths}
            {...rest}
          />
        );
      }}
    </Query>
  );
};

export default compose<Props, Props>(
  withMatchParamsHandlers,
  connect(
    (state: Store) => ({
      selectedBerths: state.berths.selectedBerths,
      selectedServices: state.berths.selectedServices,
      values: state.forms.berthValues,
      berthsApplicationType: state.application.berthsApplicationType,
      initialValues: state.application.berthSwitch,
    }),
    {
      deselectBerth,
      moveUp,
      moveDown,
      submitExchangeForm,
    }
  )
)(UnconnectedSelectedBerthPage);
