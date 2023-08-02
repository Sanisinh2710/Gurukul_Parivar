import React from 'react';

import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AllImages} from '../../../../assets/images';
import {CommonStyle} from '../../../../assets/styles';

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
