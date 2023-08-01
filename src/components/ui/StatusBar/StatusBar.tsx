import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '../../../types';
import {style} from './style';
import {ImageBackground} from 'react-native';
import {AllImages} from '../../../../assets/images';

type CustomStatusBarProps = {
  [key: string]: any;
  backgroundColor?: string;
  theme: Theme;
};

export const CustomStatusBar = React.memo(
  ({
    backgroundColor,
    theme,
    ...props
  }: CustomStatusBarProps): React.JSX.Element => {
    const insets = useSafeAreaInsets();

    return (
      <ImageBackground
        source={AllImages.WrapBG}
        tintColor={backgroundColor}
        style={style(backgroundColor, insets).statusBarMainView}>
        <StatusBar
          barStyle={theme.isDark ? 'dark-content' : 'dark-content'}
          translucent
          backgroundColor="transparent"
          {...props}
        />
      </ImageBackground>
    );
  },
);
