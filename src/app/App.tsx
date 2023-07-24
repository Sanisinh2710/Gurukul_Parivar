import React from 'react';
import {Text} from 'react-native';

import '../localization/i18n';

import {Pressable, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {COLORS} from '../utils/colors';
import {CustomFonts} from '../utils/fonts';

export const App = () => {
  const {t, i18n} = useTranslation();

  return (
    <View>
      <Text>{t('loginScren:WelcomeTitle')}</Text>
      <Pressable
        onPress={() => {
          i18n.changeLanguage('gu');
        }}
        style={{
          borderRadius: 30,
          padding: 20,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...CustomFonts.body.regular14,
            color: COLORS.black,
            fontSize: 20,
          }}>
          Change Language
        </Text>
      </Pressable>
    </View>
  );
};
