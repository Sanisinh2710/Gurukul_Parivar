import React from 'react';
import {View} from 'react-native';
import {useCustomTheme} from '../../../hooks';

export const HomeScreen = React.memo(() => {
  const {theme} = useCustomTheme();
  return <View></View>;
});
