import React from 'react';

import {NoData} from '@components';
import {useTranslation} from 'react-i18next';

export const ErrorFunc = (): React.JSX.Element => {
  const {t} = useTranslation();

  return (
    <NoData title={t('NoData.ErrorTitle')} content={t('NoData.ErrorContent')} />
  );
};
