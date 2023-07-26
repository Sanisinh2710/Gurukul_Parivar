import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '../../../types';
import {style} from './style';

type CustomStatusBarProps = {
  [key: string]: any;
  backgroundColor: string;
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
      <View style={style(backgroundColor, insets).statusBarMainView}>
        <StatusBar
          barStyle={theme.isDark ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor={backgroundColor}
          {...props}
        />
      </View>
    );
  },
);
