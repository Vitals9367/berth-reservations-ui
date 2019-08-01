import React from 'react';
import { Col, Row } from 'reactstrap';

import withApplicationType from '../../common/withApplicationType/withApplicationType';
import BoatInfo from '../fragments/overview/BoatInfo';
import BoatMeasures from '../fragments/overview/BoatMeasures';
import BoatTypeAndModel from '../fragments/overview/BoatTypeAndModel';
import LinkedEditSection from '../fragments/overview/linkedEditSection/LinkedEditSection';
import OverviewInfo from '../fragments/overview/overviewInfo/OverviewInfo';
import OverviewStorageMethod from '../fragments/overview/OverviewStorageMethod';
import Person from '../fragments/overview/Person';

import { WinterStorageMethod } from '../../../__generated__/globalTypes';
import { ApplicationState } from '../../../redux/types';
import { Berths } from '../../berths/types';
import { StepType } from '../../steps/step/Step';
import { WithBoatType } from '../Selects';

type Props = {
  values: {
    boatName: string;
    boatRegistrationNumber: string;
    boatType: string;
    boatModel: string;
    boatWidth: string;
    boatLength: string;
    boatDraught: string;
    boatWeight: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    municipality: string;
    storageMethod?: WinterStorageMethod;
    trailerRegistrationNumber?: string;
  };
  selectedBerths: Berths;
  application?: ApplicationState;
  steps: StepType[];
  boatTab: string;
  applicationType: string;
} & WithBoatType;

const WinterOverviewInfo = ({
  values,
  selectedBerths,
  boatTypes,
  steps,
  boatTab,
  applicationType
}: Props) => (
  <OverviewInfo title={applicationType}>
    <LinkedEditSection title="page.overview.info.boat_info" link={steps[2].linkTo}>
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
      {boatTab === 'no-boat' && (
        <>
          <BoatTypeAndModel
            boatTypeId={values.boatType}
            boatModel={values.boatModel}
            boatTypes={boatTypes}
          />
          <BoatMeasures width={values.boatWidth} length={values.boatLength} />
        </>
      )}
      {values.storageMethod && (
        <OverviewStorageMethod
          registrationNumber={values.trailerRegistrationNumber}
          storageMethod={values.storageMethod}
        />
      )}
    </LinkedEditSection>
    <LinkedEditSection title="page.overview.info.berths" link={steps[1].linkTo}>
      <Row>
        <Col xs={12}>
          {selectedBerths.map((berth, index) => (
            <div key={berth.id}>
              {index + 1}. {berth.name}
            </div>
          ))}
        </Col>
      </Row>
    </LinkedEditSection>
    <LinkedEditSection title="page.overview.info.person" link={steps[3].linkTo}>
      <Person
        firstName={values.firstName}
        lastName={values.lastName}
        email={values.email}
        phoneNumber={values.phoneNumber}
        address={values.address}
        zipCode={values.zipCode}
        municipality={values.municipality}
      />
    </LinkedEditSection>
  </OverviewInfo>
);

export default withApplicationType(WinterOverviewInfo);
