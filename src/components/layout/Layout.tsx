import React, { Fragment } from 'react';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Col, Container, Nav, Navbar, NavbarBrand, Row } from 'reactstrap';
import styled from 'styled-components';

import heroImage from '../../assets/images/hero_image_berth.jpg';
import responsive from '../../utils/responsive';
import Icon from '../common/Icon';
import Footer from './Footer';
import KoroSection from './KoroSection';
import LanguageDropdown from './LanguageDropdown';

type Props = {
  children: any;
  hero?: boolean;
} & InjectedIntlProps;

const TopNavbar = styled(Navbar)`
  background-color: ${props => props.theme.colors.helWhite};
  border-bottom: 1px solid ${props => props.theme.colors.light};
  height: 3.5em;
  & a {
    color: #000;
  }
  & a:hover {
    text-decoration: none;
    color: #000;
  }
`;

const BottomNavbar = styled(Navbar)`
  height: 3.5em;
`;

const Hero = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: right top;
  padding: 4em 0;
  min-height: 10em;
  ${responsive.md`
      min-height: 20em;
    `}
  ${responsive.xl`
      min-height: 30em;
    `}
  h1 {
    font-size: 2em;
    ${responsive.sm`
      font-size: 3em;
    `}
    ${responsive.lg`
      font-size: 4em;
    `}
    color: #fff;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled(KoroSection).attrs({
  bottom: true,
  color: 'fog'
})``;

const HeroContent = styled(KoroSection).attrs({
  bottom: true,
  color: 'white'
})`
  > div {
    margin-top: 3em;
    margin-bottom: 4em;
  }
`;

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

const Layout = ({ children, hero, intl: { locale } }: Props) => (
  <Fragment>
    <TopNavbar expand="md">
      <Container>
        <NavbarBrand href="/">
          <Icon name="helsinkiLogo" width="90px" color="#000" />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <LanguageDropdown />
        </Nav>
      </Container>
    </TopNavbar>
    <BottomNavbar color="white" light expand="md">
      <Container>
        <NavbarBrand href="/">
          <FormattedMessage id="site.title" />
        </NavbarBrand>
      </Container>
    </BottomNavbar>
    {hero && (
      <Fragment>
        <Hero>
          <Container>
            <FormattedMessage tagName="h1" id="site.title" />
          </Container>
        </Hero>
        <HeroContent>
          <Container>
            <Row>
              <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                <FormattedMessage tagName="h1" id="hero.title" />
                <FormattedMessage tagName="p" id="hero.paragraph.first" />
                <FormattedHTMLMessage
                  tagName="p"
                  id="hero.paragraph.second"
                  values={{ url: getHeroContentLink(locale) }}
                />
              </Col>
            </Row>
          </Container>
        </HeroContent>
      </Fragment>
    )}
    <Content>{children}</Content>
    <KoroSection bottom color="blue">
      <Footer />
    </KoroSection>
  </Fragment>
);

export default injectIntl(Layout);
