import React from 'react';

import {PermissionsAndroid, Platform} from 'react-native';

import {Routes} from '../routes';

export const App = () => {
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
  return <Routes />;
};
