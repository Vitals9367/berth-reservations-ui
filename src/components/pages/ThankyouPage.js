// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Layout from './Layout';
import ThankYouLegend from '../ThankYouLegend';

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5em;
`;

const ThankYouPage = () => (
  <Layout>
    <ThankYouLegend />
    <ButtonSection>
      <Link to="/">
        <Button type="button">
          <FormattedMessage tagName="span" id="site.buttons.back_to_frontpage" />
        </Button>
      </Link>
    </ButtonSection>
  </Layout>
);

export default ThankYouPage;
