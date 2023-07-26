import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

export const style = (backgroundColor?: string, insets?: EdgeInsets) =>
  StyleSheet.create({
    statusBarMainView: {
      backgroundColor,
      height: insets?.top,
    },
  });
