import React from 'react';

import {AllImages, CommonStyle} from '@assets';
import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type ScreenWrapperProps = {
  children: React.JSX.Element | React.JSX.Element[];
};

export const ScreenWrapper = React.memo(
  ({children}: ScreenWrapperProps): React.JSX.Element => {
    const common = CommonStyle();

    return (
      <SafeAreaView style={common.commonContainer}>
        <ImageBackground source={AllImages.WrapBG} style={{flex: 1}}>
          {children}
        </ImageBackground>
      </SafeAreaView>
    );
  },
);
