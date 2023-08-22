import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    NoDataTitle: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 27,
    },
    NoDataContent: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 25,
      textAlign: 'center',
      top: 8,
    },
  });
};
