import React from 'react';
import { useTranslation } from 'react-i18next';

import NoticeTemplate from './NoticeTemplate';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <NoticeTemplate
      titleText={t('page.not_found.title')}
      message={<p>{t('page.not_found.message')}</p>}
    />
  );
};

export default NotFoundPage;
