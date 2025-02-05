import { useState } from 'react';
import * as React from 'react';
import Transition from 'react-transition-group/Transition';
import { useTranslation } from 'react-i18next';

import { genValidSelector } from '../../utils/urls';
import { TContext } from '../../types/translation';
import { IconNames } from '../../icon/Icon';
import Modal from '../../modal/Modal';
import SelectedResource from './SelectedResource';
import useTransitionLogic from './useTransitionLogic';
import './selectedResource.scss';

export type Props = {
  tContext: TContext;
  availabilityLevel?: { id: string; title: string | null; description: string | null } | null;
  className?: string;
  id: string;
  services: [IconNames, boolean][];
  title: React.ReactNode;
  validationErrMsg?: string;
  handleRemove(id: string): void;
  moveDown?(id: string): void;
  moveUp?(id: string): void;
};

const SelectedResourceContainer = ({
  tContext,
  availabilityLevel,
  className,
  handleRemove,
  id,
  moveDown,
  moveUp,
  services,
  title,
  validationErrMsg,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { hasChanged, toggleEnterState, doMoveUp, doMoveDown, doDelete } = useTransitionLogic({
    moveDown,
    moveUp,
    handleRemove,
    id,
  });
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { t } = useTranslation();

  const validDomId = genValidSelector(`popover_${id}`);

  return (
    <Transition in={hasChanged} timeout={300} onEntered={toggleEnterState}>
      {(state) => (
        <>
          <SelectedResource
            availabilityLevel={availabilityLevel}
            className={className}
            services={services}
            state={state}
            title={title}
            validDomId={validDomId}
            validationErrMsg={validationErrMsg}
            doMoveUp={doMoveUp}
            doMoveDown={doMoveDown}
            toggleModal={toggleModal}
          />
          <Modal
            id="SelectedResourceContainer-remove"
            variant="danger"
            handleSubmit={doDelete}
            handleToggle={toggleModal}
            submitButtonLabel={t('site.buttons.remove')}
            title={t('page.selected.confirmation_body', { context: tContext })}
            isOpen={isModalOpen}
          />
        </>
      )}
    </Transition>
  );
};

export default SelectedResourceContainer;
