import React from 'react';

import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../assets/styles';
import {AllImages} from '../../../../assets/images';

type ScreenWrapperProps = {
  children: React.JSX.Element[];
};

export const ScreenWrapper = ({children}: ScreenWrapperProps) => {
  const common = CommonStyle();

  return (
    <SafeAreaView style={common.commonContainer}>
      <ImageBackground source={AllImages.WrapBG} style={{flex: 1}}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};
