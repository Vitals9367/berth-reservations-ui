import { Record } from 'immutable';

import { ApplicationOptions } from '../../types/applicationType';
import { Action, ApplicationFactory, ApplicationState } from '../types';

const initState = {
  selectedApplicationType: ApplicationOptions.ExchangeApplication,
  berthSwitch: {
    harborId: '',
    berthNumber: ''
  }
};
const defaultState: ApplicationFactory = Record(initState);

export default (state: ApplicationState = defaultState(), action: Action): ApplicationState => {
  const { type, payload } = action;

  switch (type) {
    case 'APPLICATION.SWITCH_APPLICATION':
      return state.set('selectedApplicationType', payload);
    case 'APPLICATION.SUBMIT_FORM':
      return state.set('berthSwitch', payload);
    case 'APPLICATION.RESET_APPLICATION':
      return defaultState();
    default:
      return state;
  }
};
