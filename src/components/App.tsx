import React from 'react';
import { IntlProvider } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router';
import messages from '../config/translations';

import BerthPage from './pages/containers/BerthPageContainer';
import FormPage from './pages/containers/FormPageContainer';
import SelectedBerthPage from './pages/containers/SelectedBerthPageContainer';
import ThankYouPage from './pages/containers/ThankYouPageContainer';

import SelectedAreasPage from './pages/containers/SelectedAreasPageContainer';
import WinterBerthPage from './pages/containers/WinterBerthPageContainer';
import WinterFormPage from './pages/containers/WinterFormPageContainer';

export interface Props {
  locale: 'fi' | 'en' | 'sv';
}

const localeParam = ':locale(fi|en|sv)';

const App = ({ locale }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Redirect exact path={`/${localeParam}/`} to={`/${localeParam}/berths`} />
      <Route exact path={`/${localeParam}/berths`} component={BerthPage} />
      <Route exact path={`/${localeParam}/selected_berths`} component={SelectedBerthPage} />
      <Route exact path={`/${localeParam}/form`} component={FormPage} />
      <Route exact path={`/${localeParam}/form/:tab`} component={FormPage} />
      <Route exact path={`/${localeParam}/thank_you`} component={ThankYouPage} />
      <Route exact path={`/${localeParam}/winter_storage`} component={WinterBerthPage} />
      <Route exact path={`/${localeParam}/selected_areas`} component={SelectedAreasPage} />
      <Route exact path={`/${localeParam}/winter_form`} component={WinterFormPage} />
      <Route exact path={`/${localeParam}/winter_form/:tab`} component={WinterFormPage} />
    </Switch>
  </IntlProvider>
);

export default App;
