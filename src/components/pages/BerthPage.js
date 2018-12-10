// @flow
import React, { Component } from 'react';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Layout from '../layout/Layout';
import BerthsLegend from '../legends/BerthsLegend';
import BerthsOnMap from '../berths/BerthsOnMap';
import Berths from '../berths/Berths';
import TabSelector from '../berths/TabSelector';

const Wrapper = styled.div`
  margin-bottom: 5em;
`;

type Props = any;

class BerthPage extends Component<Props> {
  componentDidMount() {
    const { getBerths, berths, boatTypes, getBoatTypes } = this.props;
    if (!boatTypes) {
      getBoatTypes();
    }
    if (berths.size === 0) {
      getBerths();
    }
  }

  onSubmit = async (values: any) => {
    const { onSubmit } = this.props;
    await onSubmit(values);
  };

  moveToForm = async () => {
    const { localePush } = this.props;
    await localePush('/selected_berths');
  };

  getFilterByValues = (values: any, selectedServices: any) => {
    const width = get(values, 'boat.width', 0);
    const length = get(values, 'boat.length', 0);
    const boatType = get(values, 'boat.type', 0);
    const services = Object.entries(selectedServices.toObject())
      .filter(([, state]) => state)
      .map(([type]) => type);
    return (b: any) => {
      const filterByService = services.reduce((acc, cur) => acc && b[cur], true);
      const filterByWidth = b.maximum_width >= width;
      const filterByLenght = b.maximum_length >= length;
      const filterByBoatTypeIds = boatType ? b.suitable_boat_types.includes(boatType) : true;
      return filterByService && filterByWidth && filterByLenght && filterByBoatTypeIds;
    };
  };

  toggleBerthSelect = (id: string) => {
    const { selectedBerths, selectBerth, deselectBerth } = this.props;
    if (selectedBerths.includes(id)) {
      deselectBerth(id);
    } else {
      selectBerth(id);
    }
  };

  render() {
    const {
      boatTypes,
      initialValues,
      berths,
      selectedBerths,
      selectedServices,
      selectService,
      deselectService
    } = this.props;
    const filter = this.getFilterByValues(initialValues, selectedServices);
    const filtered = berths.filter(filter);
    const FilteredNot = berths.filterNot(filter);
    return (
      <Layout>
        <Wrapper>
          <BerthsLegend
            boatTypes={boatTypes}
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            selectedServices={selectedServices}
            selectService={selectService}
            deselectService={deselectService}
          />
          <TabSelector>
            <BerthsOnMap
              TabHeader={() => <FormattedMessage tagName="span" id="page.berths.map" />}
              berths={berths}
              filtered={filtered}
              selected={selectedBerths}
              onClick={this.toggleBerthSelect}
            />
            <Berths
              TabHeader={() => <FormattedMessage tagName="span" id="page.berths.list" />}
              filtered={filtered}
              filteredNot={FilteredNot}
              selected={selectedBerths}
              onClick={this.toggleBerthSelect}
            />
            <div TabHeader={() => <button onClick={this.moveToForm}>Jatka</button>} />
          </TabSelector>
        </Wrapper>
      </Layout>
    );
  }
}

export default BerthPage;
