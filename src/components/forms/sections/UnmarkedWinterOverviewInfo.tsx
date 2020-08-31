import React from 'react';
import { Col, Row } from 'reactstrap';
import { UnmarkedWinterFormValues, WinterStorageArea } from '../../../types/unmarkedWinterStorage';
import { StepType } from '../../steps/step/Step';
import BoatInfo from '../fragments/overview/BoatInfo';
import BoatMeasures from '../fragments/overview/BoatMeasures';
import BoatTypeAndModel from '../fragments/overview/BoatTypeAndModel';
import Company from '../fragments/overview/company/Company';
import LinkedEditSection from '../fragments/overview/linkedEditSection/LinkedEditSection';
import OverviewInfo from '../fragments/overview/overviewInfo/OverviewInfo';
import Person from '../fragments/overview/person/Person';
import { WithBoatType } from '../Selects';

export type UnmarkedWinterOverviewInfoProps = {
  values: UnmarkedWinterFormValues;
  selectedArea: WinterStorageArea;
  steps: StepType[];
  boatTab: string;
} & WithBoatType;

const UnmarkedWinterOverviewInfo = ({
  boatTab,
  boatTypes,
  selectedArea,
  steps,
  values,
}: UnmarkedWinterOverviewInfoProps) => {
  return (
    <OverviewInfo>
      <LinkedEditSection title="page.overview.info.boat_info" link={steps[1].linkTo}>
        {boatTab === 'registered-boat' && (
          <>
            <BoatInfo name={values.boatName} registerNumber={values.boatRegistrationNumber} />
            <BoatTypeAndModel
              boatTypeId={values.boatType}
              boatModel={values.boatModel}
              boatTypes={boatTypes}
            />
            <BoatMeasures width={values.boatWidth} length={values.boatLength} />
          </>
        )}
        {boatTab === 'unregistered-boat' && (
          <>
            <BoatInfo name={values.boatName} registerNumber={values.boatRegistrationNumber} />
            <BoatTypeAndModel
              boatTypeId={values.boatType}
              boatModel={values.boatModel}
              boatTypes={boatTypes}
            />
            <BoatMeasures width={values.boatWidth} length={values.boatLength} />
          </>
        )}
      </LinkedEditSection>
      <LinkedEditSection title="page.overview.info.winter_storage_area" link={steps[0].linkTo}>
        <Row>
          <Col xs={12}>
            <div>{selectedArea.name}</div>
          </Col>
        </Row>
      </LinkedEditSection>
      <LinkedEditSection title="page.overview.info.owner_information" link={steps[2].linkTo}>
        {values.companyName && values.businessId ? (
          <Company
            companyName={values.companyName}
            businessId={values.businessId}
            firstName={values.firstName}
            lastName={values.lastName}
            email={values.email}
            phoneNumber={values.phoneNumber}
            address={values.address}
            zipCode={values.zipCode}
            municipality={values.municipality}
          />
        ) : (
          <Person
            firstName={values.firstName}
            lastName={values.lastName}
            email={values.email}
            phoneNumber={values.phoneNumber}
            address={values.address}
            zipCode={values.zipCode}
            municipality={values.municipality}
          />
        )}
      </LinkedEditSection>
    </OverviewInfo>
  );
};
export default UnmarkedWinterOverviewInfo;
