import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import SectionSelector from '../SectionSelector';
import Company from '../tabs/Company';
import PrivatePerson from '../tabs/PrivatePerson';

const Content = styled.div``;

interface Props {
  tab: string;
}

const ApplicantDetails = ({ tab }: Props) => (
  <Content>
    <SectionSelector
      name="boat"
      selected={tab}
      sizes={{
        xs: 6,
        md: 4,
        lg: 3
      }}
      types={[
        {
          label: 'form.boat_type_selector.private_person.label',
          tab: 'private_person',
          icon: 'individual'
        },
        {
          label: 'form.boat_type_selector.company.label',
          tab: 'company',
          icon: 'business'
        }
      ]}
    />
    <Container>
      <Row>
        <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
          {tab === 'private_person' && <PrivatePerson prefix="applicant" />}
          {tab === 'company' && <Company prefix="applicant" />}
        </Col>
      </Row>
    </Container>
  </Content>
);

export default ApplicantDetails;
