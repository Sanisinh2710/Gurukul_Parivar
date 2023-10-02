import React from 'react';
import {useTranslation} from 'react-i18next';

import {PermissionsAndroid, Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ErrorBoundary, Loader} from '../components';
import {persistor, store} from '../redux/store';
import {Routes} from '../routes';
import {storage} from '../storage';

export const App = () => {
  const {i18n} = useTranslation();

  React.useMemo(async () => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

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

    const getLanguage = () => {
      const getLangCode = storage.getString('langCode');
      if (getLangCode) {
        const newLangcode = JSON.parse(getLangCode);

        if (newLangcode) {
          i18n.changeLanguage(newLangcode);
        }
      }
    };

    getLanguage();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};
