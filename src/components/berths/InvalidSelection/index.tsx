import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../../common/Icon';
import Popover from '../../common/popover/Popover';

import './InvalidSelection.scss';

interface Props {
  id: string;
  msg: string;
}

const InvalidSelection = ({ id, msg }: Props) => {
  const { t } = useTranslation();

  return (
    <Popover
      id={id}
      body={<span>{t(msg)}</span>}
      placement="bottom"
      className="vene-invalid-selection"
    >
      <Icon name="exclamationCircle" className="vene-invalid-selection__icn" />
    </Popover>
  );
};

export default InvalidSelection;
