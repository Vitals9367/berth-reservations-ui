import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../common/LocalizedLink';
import Icon, { IconNames } from '../common/Icon';
import responsive from '../../utils/responsive';

const ButtonWrapper = styled.div`
  background-color: ${props => props.theme.helLight};
  padding: 1em;
`;
type TypeProps = {
  label: string;
  tab: string;
  icon: IconNames;
};

type Props = {
  name: string;
  selected: any;
  types: Array<TypeProps>;
  sizes: {
    xs?: number;
    md?: number;
    lg?: number;
  };
};

type FormSelectWrapperProps = {
  selected: boolean;
};

const FormSelectWrapper = styled(LocalizedLink)<FormSelectWrapperProps>`
  display: block;
  color: inherit;
  padding: 1em;
  text-align: center;
  min-height: 8em;
  &:hover,
  &:active {
    text-decoration: none;
    color: inherit;
  }

  svg {
    max-height: 6em;
  }

  background-color: ${props => (props.selected ? props.theme.helFog : 'unset')};
  font-size: 0.8em;
  line-height: 1;
  ${responsive.sm`
    font-size: 1em;
    font-weight: ${(props: FormSelectWrapperProps) => (props.selected ? '600' : '400')};
  `}
`;

const SectionSelector = ({ name, selected, types, sizes }: Props) => (
  <ButtonWrapper>
    <Container>
      <Row>
        <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
          <Row>
            {types.map(({ label, tab, icon }: TypeProps) => (
              <Col id={`${tab}_selection`} key={`${name}.${tab}`} {...sizes}>
                <FormSelectWrapper to={`form/${tab}`} selected={selected === tab}>
                  <Icon name={icon} width="50%" color="black" />
                  <FormattedMessage id={label} />
                </FormSelectWrapper>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </ButtonWrapper>
);

export default SectionSelector;
