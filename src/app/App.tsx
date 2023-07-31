import React from 'react';

import {PermissionsAndroid, Platform} from 'react-native';

import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Loader} from '../components';
import {persistor, store} from '../redux/store';
import {Routes} from '../routes';

enableScreens(true);

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
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};
