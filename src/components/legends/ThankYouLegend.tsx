import React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Col, Container, Row } from 'reactstrap';

export default () => (
  <Container>
    <Row>
      <Col md="12">
        <FormattedMessage tagName="h3" id="legend.thankyou.title" />
        <FormattedMessage tagName="p" id="legend.thankyou.legend.regards" />
        <FormattedHTMLMessage tagName="p" id="legend.thankyou.legend.contact_information" />
      </Col>
    </Row>
  </Container>
);
