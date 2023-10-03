import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
      lineHeight: 25.92,
    },
    content: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'black',
      lineHeight: 25,
    },
    titleContainer: {
      marginTop: 20,
    },
    date: {
      ...CustomFonts.body.large14,
      fontSize: 14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18.9,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    imageContainer: {
      height: 350,
      marginTop: '3%',
    },
  });
};
