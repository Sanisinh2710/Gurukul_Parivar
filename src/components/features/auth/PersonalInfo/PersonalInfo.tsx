import React from 'react';
import {useTranslation} from 'react-i18next';
import {PersonalInfoStyle} from './styles';

export const PersonalInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();

    const style = PersonalInfoStyle();

    return <></>;
  },
);
