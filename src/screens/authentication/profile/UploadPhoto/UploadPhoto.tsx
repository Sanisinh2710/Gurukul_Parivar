import React from 'react';
import {View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import {styles} from '../../login/loginSuccess/styles';
import {ScreenHeader} from '../../../../components';
import {useTranslation} from 'react-i18next';

export const UploadPhoto = () => {
  const {t, i18n} = useTranslation();

  const commonStyle = CommonStyle();

  return (
    <View style={commonStyle.container}>
      <View>
        <ScreenHeader
          theme={undefined}
          showLeft={true}
          headerTitle={t('loginSuccess:LoginSuccess')}
          headerTitleAlign="center"
        />
      </View>
    </View>
  );
};
