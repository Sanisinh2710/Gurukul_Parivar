import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
    },
    date: {
      ...CustomFonts.header.medium20,
      color: 'white',
    },
    day: {
      ...CustomFonts.body.small10,
      fontSize: 16,
      color: 'white',
    },
    content1: {
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
      lineHeight: 18.9,
    },
    content2: {
      fontSize: 14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18.9,
    },
  });
};
