import React from 'react';
import {useTranslation} from 'react-i18next';
import {PersonalInfoStyle} from './styles';
import {PrimaryButton} from '../../../ui';

export const PersonalInfo = React.memo(
  ({initialValues, onSubmitEvent}: any): React.JSX.Element => {
    const {t} = useTranslation();

    const style = PersonalInfoStyle();
    const formSubmitDat = {
      gender: '',
      fullname: '',
      fatherFullName: '',
      dob: '',
      bloodGroup: '',
      mobilenum: '',
      secondaryMobileNum: '',
      email: '',
      secondaryEmail: '',
    };
    return (
      <PrimaryButton
        title={t('uploadPhoto.NextBtn')}
        onPress={() => onSubmitEvent(formSubmitDat)}
      />
    );
  },
);
