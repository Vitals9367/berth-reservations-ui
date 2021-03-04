import { Navigation, NavigationProps } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './navbar.scss';
import { matchPath, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import authService from '../../../app/auth/authService';
import { useCurrentUser } from '../../../app/auth/hooks';

const Navbar = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const userName = currentUser?.name ?? '-';

  const localizedRootUrl = (lang: string) => `/${lang}`;
  const localizedLink = (url: string, lang: string = language) => `${localizedRootUrl(lang)}${url}`;
  const isLinkActive = (url: string) => !!matchPath(location.pathname, url);

  const navigationProps: NavigationProps = {
    className: 'vene-navbar',
    logoLanguage: language === 'sv' ? 'sv' : 'fi',
    menuToggleAriaLabel: '',
    skipTo: '',
    skipToContentLabel: '',
    title: t('site.front.title'),
    titleUrl: localizedLink('/'),
  };
  const languages = ['fi', 'sv', 'en'];
  const links = [
    {
      url: '/berths',
      label: t('site.berth.title'),
    },
    {
      url: '/winter-storage',
      label: t('site.winter.title'),
    },
    {
      url: '/unmarked-winter-storage',
      label: t('site.unmarked_winter_storage.title'),
    },
  ];

  return (
    <Navigation {...navigationProps}>
      <Navigation.Row>
        {links.map(({ label, url }) => (
          <Navigation.Item
            key={url}
            active={isLinkActive(localizedLink(url))}
            href={localizedLink(url)}
            label={label}
          />
        ))}
      </Navigation.Row>

      <Navigation.Actions>
        <Navigation.User
          authenticated={authService.isAuthenticated()}
          label="Kirjaudu sisään"
          userName={userName}
          onSignIn={() => history.push(localizedLink('/login'))}
        >
          <Navigation.Item label="Kirjaudu ulos" href={localizedLink('/logout')} />
        </Navigation.User>

        <Navigation.LanguageSelector label={language.toUpperCase()} buttonAriaLabel={'site.language.select'}>
          {languages.map((lang) => (
            <Navigation.Item key={lang} href={localizedLink('/', lang)} label={t(`site.language.${lang}`)} />
          ))}
        </Navigation.LanguageSelector>
      </Navigation.Actions>
    </Navigation>
  );
};

export default Navbar;
