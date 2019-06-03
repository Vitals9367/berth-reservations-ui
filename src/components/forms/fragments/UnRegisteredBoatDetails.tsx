import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';

import { mustBePositiveNumber } from '../../../utils/formValidation';
import { Number, Checkbox } from '../Fields';
import { BoatType } from '../Selects';

import { BoatTypes } from '../../../types/boatTypes';

interface Props {
  hideTitle?: boolean;
  fieldsNotRequired?: boolean;
  boatTypes?: BoatTypes;
}

const UnRegisteredBoatDetailsFragment = ({ fieldsNotRequired, boatTypes, hideTitle }: Props) => {
  return (
    <>
      {!hideTitle && <FormattedMessage tagName="h3" id="form.unregistered.header.title" />}
      <Row>
        {boatTypes && (
          <Col sm={4}>
            <BoatType boatTypes={boatTypes} required={!fieldsNotRequired} />
          </Col>
        )}
        <Col sm={4}>
          <Number
            validate={mustBePositiveNumber}
            name={`boatWidth`}
            label="form.no_boat.field.width.label"
            placeholder="form.no_boat.field.width.placeholder"
            append="m"
            min="0"
            required={!fieldsNotRequired}
          />
        </Col>
        <Col sm={4}>
          <Number
            validate={mustBePositiveNumber}
            name={`boatLength`}
            label="form.no_boat.field.length.label"
            placeholder="form.no_boat.field.length.placeholder"
            append="m"
            min="0"
            required={!fieldsNotRequired}
          />
        </Col>
        <Col sm={4}>
          <Checkbox name={`storageType`} label="form.registered.field.winter_storage.storage_type.label" inline="false" />
        </Col>
      </Row>
    </>
  )
};

export default UnRegisteredBoatDetailsFragment;
