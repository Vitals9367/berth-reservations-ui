import React, { Component } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { getBerthFilterByValues } from '../../../utils/berths';
import Berths from '../../berths';
import BerthsOnMap from '../../berths/BerthsOnMap';
import TabSelector from '../../berths/TabSelector';
import { IconNames } from '../../common/Icon';
import UnRegisteredBoatDetails from '../../forms/fragments/UnRegisteredBoatDetails';
import Layout from '../../layout/Layout';
import BerthsLegend from '../../legends/BerthLegend';

import { BerthType } from '../../../types/berth';
import { BoatTypes } from '../../../types/boatTypes';
import { FormMode } from '../../../types/form';
import { BerthsServices, SelectedServices, WinterServices } from '../../../types/services';
import { LocalePush } from '../../../utils/container';
import { Berths as BerthsType } from '../../berths/types';

import berthsHeroImg from '../../../assets/images/hero_image_berth.jpg';
import winterHeroImg from '../../../assets/images/hero_image_winter_storage.jpg';

import { StorageAreaFilter } from '../../../redux/reducers/WinterAreaReducers';
import Hero from '../../common/hero/Hero';
import KoroSection from '../../layout/koroSection/KoroSection';
import { StepType } from '../../steps/step/Step';
type Props = {
  initialValues: {};
  filtered: BerthsType;
  filteredNot: BerthsType;
  selectedBerths: BerthsType;
  selectedServices: SelectedServices;
  selectBerth: Function;
  deselectBerth: Function;
  selectService: Function;
  deselectService: Function;
  onSubmit: Function;
  localePush: LocalePush;
  berths: BerthsType;
  boatTypes?: BoatTypes;
  steps: StepType[];
  services: Array<{
    label: string;
    value: BerthsServices | WinterServices;
    icon: IconNames;
  }>;
  formMode?: FormMode;
  berthLimit: number;
  storageAreaFilter?: StorageAreaFilter;
} & InjectedIntlProps;

const getHeroContentLink = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'https://www.hel.fi/helsinki/en/culture/recreation/boating/boat-berths/';
    case 'sv':
      return 'https://www.hel.fi/helsinki/sv/kultur-och-fritid/friluftsliv/botliv/batplatser/';
    default:
      return 'https://www.hel.fi/helsinki/fi/kulttuuri-ja-vapaa-aika/ulkoilu/veneily/kaupungin-venepaikat/venepaikan-hakeminen/';
  }
};

class BerthPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    window.scrollTo(0, 0);
  }

  moveToForm = async () => {
    const { formMode, localePush } = this.props;
    const path = formMode === FormMode.Winter ? 'winter-storage/selected' : 'berths/selected';
    await localePush(path);
  };

  toggleBerthSelect = (berth: BerthType) => {
    const { selectedBerths, selectBerth, deselectBerth } = this.props;
    if (selectedBerths.find(selectedBerth => selectedBerth.id === berth.id)) {
      deselectBerth(berth);
    } else {
      selectBerth(berth);
    }
  };

  render() {
    const {
      initialValues,
      selectedBerths,
      berths,
      selectedServices,
      selectService,
      deselectService,
      onSubmit,
      boatTypes,
      formMode,
      steps,
      services,
      berthLimit,
      storageAreaFilter,
      intl
    } = this.props;
    const filter = getBerthFilterByValues(initialValues, selectedServices, storageAreaFilter);
    const filtered = berths.filter(filter);
    const filteredNot = berths.filterNot(filter);
    const validSelection = berths
      .filter(berth => selectedBerths.find(selectedBerth => selectedBerth.id === berth.id))
      .every(filter);
    const isBerthForm = formMode === FormMode.Berth;
    const heroImg = isBerthForm
      ? { bgUrl: berthsHeroImg }
      : { bgUrl: winterHeroImg, bgPosition: 'center' };

    return (
      <Layout>
        <Hero title={`site.${formMode}.title`} {...heroImg} />
        <KoroSection
          top
          title={`hero.${formMode}.title`}
          description={[
            { id: `hero.${formMode}.paragraph.first` },
            {
              id: `hero.${formMode}.paragraph.second`,
              values: { url: getHeroContentLink(intl.locale) }
            }
          ]}
        />
        <KoroSection color="fog" top className="vene-berth-filters-section">
          <BerthsLegend
            legend={{ title: `legend.${formMode}.title`, legend: `legend.${formMode}.legend` }}
            form={{
              onSubmit,
              initialValues,
              render: () => (
                <UnRegisteredBoatDetails
                  // @ts-ignore
                  boatStoredOnTrailer={!!initialValues.boatStoredOnTrailer}
                  showBoatStoredOnTrailer={!isBerthForm}
                  hideTitle
                  fieldsNotRequired
                  boatTypes={boatTypes}
                />
              )
            }}
            steps={steps}
            services={{
              selectedServices,
              selectService,
              deselectService,
              label: `form.services.field.${formMode}.services.label`,
              available: services
            }}
            formMode={formMode}
          />
        </KoroSection>
        <TabSelector
          progress={this.moveToForm}
          selectedCount={selectedBerths.size}
          validSelection={validSelection}
          berthLimit={berthLimit}
        >
          <BerthsOnMap
            TabHeader={() => <FormattedMessage tagName="span" id="page.berths.map" />}
            filtered={filtered}
            filteredNot={filteredNot}
            selected={selectedBerths}
            onClick={this.toggleBerthSelect}
            berthLimit={berthLimit}
          />
          <Berths
            TabHeader={() => <FormattedMessage tagName="span" id="page.berths.list" />}
            filtered={filtered}
            filteredNot={filteredNot}
            selected={selectedBerths}
            onClick={this.toggleBerthSelect}
            berthLimit={berthLimit}
          />
        </TabSelector>
      </Layout>
    );
  }
}

export default injectIntl(BerthPage);
