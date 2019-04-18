import React, { FC, useState } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Label } from 'reactstrap';
import { SELECTED_BERTH_LIMIT } from '../../../../constants/BerthConstants';
import { APPLICATION_OPTIONS } from '../../../../constants/UIConstants';
import { switchApplication as switchApplicationAction } from '../../../../redux/actions/UIActions';
import { Store } from '../../../../redux/types';
import Alert from '../../../common/Alert';
import Input from '../../../common/Input';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import './ApplicationSelector.scss';

export type ApplicationSelectorProps = InjectedIntlProps & {
  selectedBerthCount: number;
  selectedApplicationType: string;
  switchApplication: Function;
};

const ApplicationSelector: FC<ApplicationSelectorProps> = ({
  intl: { formatMessage },
  selectedBerthCount,
  selectedApplicationType,
  switchApplication
}) => {
  const isOverLimit = selectedBerthCount > SELECTED_BERTH_LIMIT;
  const [alertVisibility, toggleAlert] = useState(false);

  // Make sure new application is selected when limit is over
  // but user have selected exchange application before
  if (isOverLimit && selectedApplicationType === APPLICATION_OPTIONS.EXCHANGE_APPLICATION) {
    switchApplication(APPLICATION_OPTIONS.NEW_APPLICATION);
  }

  const onToggleSwitch = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === APPLICATION_OPTIONS.EXCHANGE_APPLICATION && isOverLimit) {
      toggleAlert(true);
    } else {
      toggleAlert(false);
      switchApplication(e.currentTarget.value);
    }
  };
  return (
    <div className="vene-application-selector">
      <div className="vene-application-selector__input-wrapper">
        <Input
          type="radio"
          value={APPLICATION_OPTIONS.NEW_APPLICATION}
          checked={selectedApplicationType === APPLICATION_OPTIONS.NEW_APPLICATION}
          id="vene-application-selector-new"
          onChange={onToggleSwitch}
          name="application-selector-radio"
        >
          <Label>{formatMessage({ id: 'page.berth.exchange_application.new' })}</Label>
          <p>{formatMessage({ id: 'page.berth.exchange_application.new.info_text' })}</p>
        </Input>

        <Input
          type="radio"
          value={APPLICATION_OPTIONS.EXCHANGE_APPLICATION}
          checked={selectedApplicationType === APPLICATION_OPTIONS.EXCHANGE_APPLICATION}
          onChange={onToggleSwitch}
          id="vene-application-selector-exchange"
          name="application-selector-radio"
        >
          <Label>{formatMessage({ id: 'page.berth.exchange_application.exchange' })}</Label>
          <p>{formatMessage({ id: 'page.berth.exchange_application.exchange.info_text' })}</p>
        </Input>
      </div>

      {alertVisibility && (
        <Alert
          toggle={() => toggleAlert(!alertVisibility)}
          color="danger"
          messageId="page.berth.exchange_application.warning"
        />
      )}
    </div>
  );
};
const mapStateToProps = (state: Store) => ({
  selectedBerthCount: state.berths.selectedBerths.size
});

export const UnconnectedApplicationSelector = injectIntl(ApplicationSelector);

export default connect(
  mapStateToProps,
  { switchApplication: switchApplicationAction }
)(UnconnectedApplicationSelector);
