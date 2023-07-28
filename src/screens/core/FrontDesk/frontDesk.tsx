import React from 'react';
import {View} from 'react-native';
import {useCustomTheme} from '../../../hooks';

export const FrontDeskScreen = React.memo(() => {
  const {theme} = useCustomTheme();
  return <View></View>;
});
