import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    text: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
  });
};
