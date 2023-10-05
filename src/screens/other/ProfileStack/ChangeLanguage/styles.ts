import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
    },
    selectedStyles: {
      height: 25,
      width: 25,
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 60,
      alignSelf: 'center',
    },
    unselectedStyles: {
      height: 25,
      width: 25,
      borderWidth: 1,
      borderColor: 'rgba(172, 43, 49, 0.3)',
      backgroundColor: 'none',
      borderRadius: 60,
      alignSelf: 'center',
    },
  });
};
