import { screen, within } from '@testing-library/testcafe';
import { escapeRegExp } from 'lodash';
import { Selector } from 'testcafe';

const yourSelection = {
  heading: screen.getByRole('heading', {
    name: /omat valinnat/i,
  }),
  nextButton: screen.getByRole('button', { name: /jatka/i }),
  getHarborHeading: (text: string) => {
    const re = new RegExp(text, 'i');
    return screen.getByText(re);
  },
  getUpButtonForHeading: (heading: Selector) => {
    const row = heading.parent(2);
    return within(row).getByRole('button', { name: /siirrä ylös/i });
  },
};

const applicantInformation = {
  heading: within(Selector('div[class="vene-form-legend"]')).getByRole('heading', {
    name: /hakijan tiedot/i,
  }),
  firstName: screen.getByRole('textbox', { name: /etunimi/i }),
  lastName: screen.getByRole('textbox', { name: /sukunimi/i }),
  address: screen.getByRole('textbox', { name: /jakeluosoite/i }),
  postalCode: screen.getByRole('textbox', { name: /postinumero/i }),
  municipalitySelect: screen.getByRole('combobox', { name: /postitoimipaikka/i }),
  phoneNumber: screen.getByRole('textbox', { name: /matkapuhelin/i }),
  emailAddress: screen.getByRole('textbox', { name: /sähköpostiosoite/i }),
  nextButton: screen.getByRole('button', { name: /seuraava/i }),
};

const overview = {
  heading: within(Selector('div[class="vene-form-legend"]')).getByRole('heading', {
    name: /yhteenveto/i,
  }),
  overviewInfo: Selector('div[class="vene-overview-info container"]'),
  getLabelValuePairs: async () => {
    const labelValuePairs = overview.overviewInfo.find('div[class="vene-label-value-pair"]');
    const labelValuePairCount = await labelValuePairs.count;

    const pairs: string[] = [];
    for (let i = 0; i < labelValuePairCount; i += 1) {
      const label = await labelValuePairs.nth(i).child(0).textContent;
      // Skipping index 1 because it is just ':'
      const value = await labelValuePairs.nth(i).child(2).textContent;
      pairs.push(`${label}: ${value}`);
    }
    return pairs.join('\n');
  },
  textInOverview: (text: string) => {
    return within(overview.overviewInfo).getByText(new RegExp(escapeRegExp(text)));
  },
};

const boatInformation = {
  boatDraught: screen.getByRole('textbox', { name: /veneen syväys, m/i }),
  boatLength: screen.getByRole('textbox', { name: /veneen pituus, m/i }),
  boatModel: screen.getByRole('textbox', { name: /merkki/i }),
  boatName: screen.getByRole('textbox', { name: /nimi/i }),
  boatRegistrationNumber: screen.getByRole('textbox', { name: 'Rekisterinumero' }),
  boatStoredOnTrailer: screen.getByRole('radio', { name: /säilytän veneen trailerilla/i }),
  boatTypeSelect: screen.getByRole('combobox', { name: /veneen tyyppi/i }),
  boatWeight: screen.getByRole('textbox', { name: /veneen paino, kg/i }),
  boatWidth: screen.getByRole('textbox', { name: /veneen leveys, m/i }),
  heading: within(Selector('div[class="vene-form-legend"]')).getByRole('heading', {
    name: /veneen tiedot/i,
  }),
  nextButton: screen.getByRole('button', { name: /seuraava/i }),
  registeredBoat: screen.getByText(/rekisteröity vene/i),
  trailerRegistrationNumber: screen.getByRole('textbox', { name: /trailerin rekisterinumero/i }),
};

const shared = {
  yourSelection,
  applicantInformation,
  overview,
  boatInformation,
};
export default shared;
