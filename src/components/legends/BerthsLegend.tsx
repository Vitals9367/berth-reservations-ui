import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Container, Row } from 'reactstrap';
import Icon, { IconNames } from '../common/Icon';
import AutoSave from '../forms/AutoSave';
import Form from '../forms/Form';
import UnRegisteredBoatDetails from '../forms/fragments/UnRegisteredBoatDetails';
import { WithBoatType } from '../forms/Selects';
import Steps from '../steps/Steps';

import { SelectedServices } from '../../types/services';

type Props = {
  initialValues: object;
  onSubmit: Function;
  selectService: Function;
  deselectService: Function;
  selectedServices: SelectedServices;
} & WithBoatType;

const services: Array<{
  label: string;
  value: 'electricity' | 'water' | 'waste_collection' | 'gate' | 'lighting';
  icon: IconNames;
}> = [
  {
    label: 'form.services.field.electricity.label',
    value: 'electricity',
    icon: 'plug'
  },
  { label: 'form.services.field.water.label', value: 'water', icon: 'waterTap' },
  {
    label: 'form.services.field.waste_collection.label',
    value: 'waste_collection',
    icon: 'trash'
  },
  { label: 'form.services.field.gate.label', value: 'gate', icon: 'fence' },
  {
    label: 'form.services.field.lighting.label',
    value: 'lighting',
    icon: 'streetLight'
  }
];

const BerthsLegend = ({
  boatTypes,
  initialValues,
  onSubmit,
  selectService,
  deselectService,
  selectedServices
}: Props) => (
  <div className="app-BerthsLegend">
    <Container>
      <Row>
        <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
          <Steps
            steps={[
              {
                key: 'berths',
                completed: false,
                current: true,
                linkTo: undefined
              },
              {
                key: 'selected_berths',
                completed: false,
                current: false,
                linkTo: undefined
              },
              {
                key: 'boat_information',
                completed: false,
                current: false,
                linkTo: undefined
              },
              {
                key: 'applicant',
                completed: false,
                current: false,
                linkTo: undefined
              },
              {
                key: 'send_application',
                completed: false,
                current: false,
                linkTo: undefined
              }
            ]}
          />

          <div>
            <FormattedMessage tagName="h3" id="legend.berths.title" />
            <FormattedMessage tagName="p" id="legend.berths.legend" />
          </div>

          <Form initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
              <Fragment>
                <UnRegisteredBoatDetails fieldsNotRequired boatTypes={boatTypes} />
                <AutoSave debounce={500} save={onSubmit} />
              </Fragment>
            )}
          </Form>

          <FormattedMessage tagName="span" id="form.services.field.services.label" />

          <div>
            {services.map((service, index) => {
              const selected = selectedServices.get(service.value);
              return (
                <button
                  key={index}
                  onClick={() =>
                    selected ? deselectService(service.value) : selectService(service.value)
                  }
                >
                  <Fragment>
                    <Icon name={service.icon} width="42px" height="42px" />
                    <FormattedMessage id={service.label} />
                  </Fragment>
                </button>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default BerthsLegend;
