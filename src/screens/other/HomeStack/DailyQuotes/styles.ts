import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    image: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
    },
    quote: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'black',
      lineHeight: 20,
    },
  });
};
