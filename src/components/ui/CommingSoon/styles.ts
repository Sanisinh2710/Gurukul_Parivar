import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    NoDataTitle: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 27,
    },
    soon: {
      alignSelf: 'center',
      marginVertical: '3%',
      ...CustomFonts.body.large14,
      color: COLORS.primaryColor,
      lineHeight: 32,
      fontSize: 24,
    },
    NoDataContent: {
      alignSelf: 'center',

      ...CustomFonts.body.large14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18,
      fontSize: 16,
    },
  });
};
