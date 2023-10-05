import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    progressText: {
      ...CustomFonts.header.large36,
      fontSize: 28,
      color: 'black',
    },
  });
};
