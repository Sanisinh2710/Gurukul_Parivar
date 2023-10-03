import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'black',
    },
  });
};
