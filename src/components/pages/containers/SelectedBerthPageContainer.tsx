import { connect } from 'react-redux';
import { compose } from 'recompose';
import { deselectBerth, moveDown, moveUp } from '../../../ducks/berths';
import { withMatchParamsHandlers } from '../../../utils/container';
import SelectedBerthPage from '../BerthPage/SelectedBerthPage';

import { BoatTypes } from '../../../types/boatTypes';
import { Store } from '../../../types/ducks';
import { SelectedServices } from '../../../types/services';
import { Berths as BerthsType, SelectedBerths as SelectedBerthsType } from '../../berths/types';

interface Props {
  selectedBerths: SelectedBerthsType;
  selectedServices: SelectedServices;
  deselectBerth: Function;
  moveUp: Function;
  moveDown: Function;
  localePush: Function;
  values: {};
}

export default compose<Props, {}>(
  withMatchParamsHandlers,
  connect(
    (state: Store) => ({
      selectedBerths: state.berths.selectedBerths,
      selectedServices: state.berths.selectedServices,
      values: state.forms.values
    }),
    {
      deselectBerth,
      moveUp,
      moveDown
    }
  )
)(SelectedBerthPage);
