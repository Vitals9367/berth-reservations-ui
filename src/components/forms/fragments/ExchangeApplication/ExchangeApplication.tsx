import { List } from 'immutable';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { HarborOption, HarborOptions } from '../../../../types/HarborOptionTypes';
import { Select } from '../../Fields';

const ExchangeApplication: FC<{
  harbors: HarborOptions;
}> = ({ harbors }) => {
  return (
    <div className="vene-exchange-application">
      <FormattedMessage tagName="h1" id="page.berth.exchange_application.current_berth.title" />
      <FormattedMessage id="page.berth.exchange_application.current_berth.info_text" />

      <div className="vene-exchange-application__select-harbour">
        <Select
          name={`harbourId`}
          label="page.berth.exchange_application.form.current_harbour_area.label"
          required
        >
          <option />
          {harbors.size &&
            harbors.map((harbor: HarborOption) => (
              <option key={harbor.id} value={harbor.id}>
                {harbor.name}
              </option>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default ExchangeApplication;
