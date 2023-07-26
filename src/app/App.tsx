import React from 'react';
import {PermissionsAndroid, Platform, Text} from 'react-native';
import {Pressable, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../utils/colors';
import {CustomFonts} from '../utils/fonts';
import {Routes} from '../routes';
import '../localization/i18n';

export const App = () => {
  const {t, i18n} = useTranslation();

  return <Routes />;
};
