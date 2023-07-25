import React from 'react';
import {PermissionsAndroid, Platform, Text} from 'react-native';

import '../localization/i18n';

import {Pressable, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {COLORS} from '../utils/colors';
import {CustomFonts} from '../utils/fonts';
import {Routes} from '../routes';

export const App = () => {
  const {t, i18n} = useTranslation();

  React.useMemo(async () => {
    // const timer = setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);

    const askingPerMissions = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          'android.permission.CAMERA',
          'android.permission.READ_EXTERNAL_STORAGE',
          'android.permission.WRITE_EXTERNAL_STORAGE',
        ]);
      }
    };

    await askingPerMissions();

    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);
  return (
    //
    <Routes />
  );
};
