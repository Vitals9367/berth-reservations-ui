import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Icon from '../common/Icon';
import responsive from '../../utils/responsive';
import { getLocalizedText } from '../../utils/berths';
import InvalidSelection from './InvalidSelection';

const StyledRow = styled(Row)`
  margin-top: 0.2em;
  margin-bottom: 0.2em;
`;

const BerthName = styled(Col)`
  background-color: ${props =>
    props.errors === 'true' ? props.theme.helCoat : props.theme.helLight};
  color: ${props => (props.errors === 'true' ? props.theme.helWhite : props.theme.helGray)};
  font-size: 0.875em;
  padding: 0.3em;
  padding-left: 0.8em;
  ${responsive.sm`
    font-size: 1.5em;
  `}
`;

const BerthOptions = styled(Col)`
  display: flex;
  align-content: center;
`;

const StyledButton = styled.button`
  background: none;
  height: 100%;
  margin-left: 1em;
  border: 2px solid ${props => (props.disabled ? 'lightgray' : 'black')};
`;

const DeselectButton = styled.button`
  background: none;
  height: 100%;
  margin-left: 1em;
  border: none;
  float: right;
  color: white;
`;

class SelectedBerth extends Component<any, any> {
  render() {
    const {
      berth,
      index,
      moveUp,
      moveDown,
      first,
      last,
      deselectBerth,
      isValid,
      intl
    } = this.props;

    const id = `tooltip_${berth.identifier}`;
    return (
      <Container fluid>
        <StyledRow>
          <BerthName xs={9} md={10} errors={isValid.toString()}>
            <DeselectButton type="button" onClick={() => deselectBerth(berth.identifier)}>
              <Icon name="times" width="30px" />
            </DeselectButton>
            <span key={berth.identifier}>
              {index + 1}. {getLocalizedText(berth.name, intl.locale)}
            </span>
            {!isValid && <InvalidSelection id={id} />}
          </BerthName>
          <BerthOptions xs={3} md={2}>
            <Container fluid>
              <Row>
                <Col xs={12} sm={6}>
                  <StyledButton
                    type="button"
                    onClick={() => moveUp(berth.identifier)}
                    disabled={first}
                  >
                    <Icon name="angleUp" width="30px" color={first ? 'lightgray' : 'black'} />
                  </StyledButton>
                </Col>
                <Col xs={12} sm={6}>
                  <StyledButton
                    type="button"
                    onClick={() => moveDown(berth.identifier)}
                    disabled={last}
                  >
                    <Icon name="angleDown" width="30px" color={last ? 'lightgray' : 'black'} />
                  </StyledButton>
                </Col>
              </Row>
            </Container>
          </BerthOptions>
        </StyledRow>
      </Container>
    );
  }
}

export default injectIntl(SelectedBerth);
