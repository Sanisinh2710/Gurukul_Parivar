import {AllImages} from '@assets';
import {Theme} from '@types';
import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {style} from './style';

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
          // Will change theme.isDark? 'light-content when dark theme will come
          barStyle={theme.isDark ? 'dark-content' : 'dark-content'}
          translucent
          backgroundColor="transparent"
          {...props}
        />
      </ImageBackground>
    );
  },
);
