import React, { Fragment } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { Berths } from '../../../types/berths';
import { getLocalizedText } from '../../../utils/berths';
import Icon from '../../common/Icon';
import LocalizedLink from '../../common/LocalizedLink';
import BoatDraughtAndWeight from '../fragments/overview/BoatDraughtAndWeight';
import BoatInfo from '../fragments/overview/BoatInfo';
import BoatMeasures from '../fragments/overview/BoatMeasures';
import BoatTypeAndModel from '../fragments/overview/BoatTypeAndModel';
import Person from '../fragments/overview/Person';
import { WithBoatType } from '../Selects';

const StyledInfoBox = styled.div`
  background-color: #efefef;
  padding: 1.5em;
  margin-bottom: 2em;
`;

const SectionHeader = styled(Col)`
  border-bottom: 1px solid #000;
  padding-left: 0px;
  margin-bottom: 1em;
  margin-top: 1em;
  font-weight: bold;
`;

const EditIcon = styled(Col)`
  margin-bottom: 1em;
  margin-top: 1em;
  font-weight: bold;
  text-align: right;
`;

const EditLink = styled(LocalizedLink)`
  display: flex;
  color: currentColor;
`;

type Props = {
  values: {
    boat_name: string;
    boat_registration_number: string;
    boat_type: string;
    boat_model: string;
    boat_width: number;
    boat_length: number;
    boat_draught: number;
    boat_weight: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    zip_code: string;
    municipality: string;
  };
  selectedBerths: Berths;
  tabs: string[];
} & InjectedIntlProps &
  WithBoatType;

const OverviewInfo = ({ values, selectedBerths, tabs, boatTypes, intl }: Props) => (
  <StyledInfoBox>
    <Container fluid>
      <Row>
        <SectionHeader xs={8} md={10}>
          <FormattedMessage tagName="h6" id="page.overview.info.boat_info" />
        </SectionHeader>
        <EditIcon xs={4} md={2}>
          <EditLink to={`form/${tabs[0]}`}>
            <Icon name="pencil" width="30px" height="30px" color="black" />
            <FormattedMessage tagName="span" id="page.overview.info.edit" />
          </EditLink>
        </EditIcon>
      </Row>
      {tabs[0] === 'registered_boat' && (
        <Fragment>
          <BoatInfo name={values.boat_name} registerNumber={values.boat_registration_number} />
          <BoatTypeAndModel
            boatTypeId={values.boat_type}
            boatModel={values.boat_model}
            boatTypes={boatTypes}
          />
          <BoatMeasures width={values.boat_width} length={values.boat_length} />
          <BoatDraughtAndWeight draught={values.boat_draught} weight={values.boat_weight} />
        </Fragment>
      )}
      {tabs[0] === 'unregistered_boat' && (
        <Fragment>
          <BoatInfo name={values.boat_name} registerNumber={values.boat_registration_number} />
          <BoatTypeAndModel
            boatTypeId={values.boat_type}
            boatModel={values.boat_model}
            boatTypes={boatTypes}
          />
          <BoatMeasures width={values.boat_width} length={values.boat_length} />
        </Fragment>
      )}
      {tabs[0] === 'no_boat' && (
        <Fragment>
          <BoatTypeAndModel
            boatTypeId={values.boat_type}
            boatModel={values.boat_model}
            boatTypes={boatTypes}
          />
          <BoatMeasures width={values.boat_width} length={values.boat_length} />
        </Fragment>
      )}
      <Row>
        <SectionHeader xs={8} md={10}>
          <FormattedMessage tagName="h6" id="page.overview.info.berths" />
        </SectionHeader>
        <EditIcon xs={4} md={2}>
          <EditLink to="berths">
            <Icon name="pencil" width="30px" height="30px" color="black" />
            <FormattedMessage tagName="span" id="page.overview.info.edit" />
          </EditLink>
        </EditIcon>
      </Row>
      <Row>
        <Col xs={12}>
          {selectedBerths.map((berth, index) => (
            <div key={berth.identifier}>
              {index + 1}. {getLocalizedText(berth.name, intl.locale)}
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <SectionHeader xs={8} md={10}>
          <FormattedMessage tagName="h6" id="page.overview.info.person" />
        </SectionHeader>
        <EditIcon xs={4} md={2}>
          <EditLink to={`form/${tabs[1]}`}>
            <Icon name="pencil" width="30px" height="30px" color="black" />
            <FormattedMessage tagName="span" id="page.overview.info.edit" />
          </EditLink>
        </EditIcon>
      </Row>
      <Person
        firstName={values.first_name}
        lastName={values.last_name}
        email={values.email}
        phoneNumber={values.phone_number}
        address={values.address}
        zipCode={values.zip_code}
        municipality={values.municipality}
      />
    </Container>
  </StyledInfoBox>
);

export default injectIntl(OverviewInfo);
