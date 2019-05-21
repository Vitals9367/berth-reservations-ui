import React from 'react';
import { Button, Card as RSCard, CardBody, CardText, CardTitle } from 'reactstrap';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import './card.scss';

type Props = {
  title: string;
  btnLabel: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
} & InjectedIntlProps;

const Card = ({
  title,
  onClick,
  btnLabel,
  children,
  intl: { formatMessage, formatHTMLMessage }
}: Props) => {
  return (
    <RSCard className="vene-card">
      <CardBody>
        <CardTitle>{formatMessage({ id: title })}</CardTitle>
        {children}
        <Button
          onClick={onClick}
          className="vene-card__button"
          type="button"
          color="primary"
          outline
        >
          {formatHTMLMessage({ id: btnLabel })}
        </Button>
      </CardBody>
    </RSCard>
  );
};

export default injectIntl(Card);
