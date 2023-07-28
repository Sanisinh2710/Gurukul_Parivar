import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {PermissionsAndroid, Platform} from 'react-native';

import {Routes} from '../routes';

export const App = () => {
  const {i18n} = useTranslation();
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

    const getLanguage = async () => {
      const getLangCode = await AsyncStorage.getItem('langCode');
      if (getLangCode) {
        const newLangcode = JSON.parse(getLangCode);

        if (newLangcode) {
          i18n.changeLanguage(newLangcode);
        }
      }
    };
    await getLanguage();

    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);
  return <Routes />;
};
