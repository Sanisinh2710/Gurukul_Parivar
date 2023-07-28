import React from 'react';
import {View} from 'react-native';
import {useCustomTheme} from '../../../hooks';

export const ProfileScreen = React.memo(() => {
  const {theme} = useCustomTheme();
  return <View></View>;
});
