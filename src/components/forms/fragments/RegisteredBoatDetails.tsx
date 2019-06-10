import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap';

import { Text } from '../Fields';
import { BoatType, WithBoatType } from '../Selects';

const RegisteredBoatDetailsFragment = ({ boatTypes }: WithBoatType) => (
  <>
    <FormattedMessage tagName="h3" id="form.registered.header.title" />
    <Row>
      <Col sm={6}>
        <Text
          name={`boatRegistrationNumber`}
          label="form.registered.field.register_number.label"
          placeholder="form.registered.field.register_number.placeholder"
          required
        />
      </Col>
      <Col sm={6}>
        <BoatType required boatTypes={boatTypes} />
      </Col>
    </Row>
  </>
);

export default RegisteredBoatDetailsFragment;
