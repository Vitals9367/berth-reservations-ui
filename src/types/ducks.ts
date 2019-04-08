import { Record, RecordOf } from 'immutable';
import { Berths as Bs, SelectedBerths } from '../components/berths/types';
import { SelectedServices } from './services';

interface FormProps {
  values: object;
}

interface BerthsProps {
  selectedBerths: SelectedBerths;
  selectedServices: SelectedServices;
}

export type FormsFactory = Record.Factory<FormProps>;
export type FormsState = RecordOf<FormProps>;
export type BerthsFactory = Record.Factory<BerthsProps>;
export type BerthsState = RecordOf<BerthsProps>;

export interface Store {
  forms: FormsState;
  berths: BerthsState;
}

export interface Action {
  type: string;
  payload: any;
}
