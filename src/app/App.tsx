import React from 'react';
import {Text} from 'react-native';

import '../localization/i18n';

import {Pressable, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {COLORS} from '../utils/colors';
import {CustomFonts} from '../utils/fonts';
import {Routes} from '../routes';

export const App = () => {
  const {t, i18n} = useTranslation();

  return (
    //
    <Routes />
  );
};
