import React from 'react';

import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import {useCustomTheme} from '../../../../hooks';
import {CustomFonts} from '../../../../utils/fonts';

export const LoginScreen = (): React.JSX.Element => {
  const {t, i18n} = useTranslation();

  const {theme, setThemeMode} = useCustomTheme();

  const commonStyle = CommonStyle(theme);

  return (
    <SafeAreaView style={[commonStyle.commonContainer]}>
      <View style={commonStyle.commonContentView}>
        <View
          style={{
            width: '30%',
            height: '30%',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../../../assets/images/SGVP_Logo1.png')}
            style={{
              flex: 1,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            ...CustomFonts.body.large14,
            fontSize: 34,
            color: theme.textColor,
          }}>
          {t('loginScren:WelcomeTitle1')}
        </Text>
        <Text
          style={{
            ...CustomFonts.header.large36,
            color: theme.primary,
          }}>
          {t('loginScren:WelcomeTitle2')}
        </Text>
        <Text
          style={{
            ...CustomFonts.body.large14,
            color: theme.textColor,
            fontWeight: '400',
            opacity: 0.5,
          }}>
          {t('loginScren:WelcomeSubtitle')}
        </Text>
      </View>
    </SafeAreaView>
  );
};
