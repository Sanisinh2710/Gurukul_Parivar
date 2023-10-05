import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    progressText: {
      ...CustomFonts.header.large36,
      fontSize: 24,
      color: 'black',
    },
  });
};
