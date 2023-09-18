import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../../utils';

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
    textBoxContainer: {
      width: '100%',
      height: 64,
      flexDirection: 'row',
    },
    dateContainer: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: '20%',
      borderWidth: 0.4,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      height: 64,
      backgroundColor: COLORS.primaryColor,
    },
    contentContainer: {
      width: '80%',
      borderWidth: 0.4,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: 'white',
      paddingLeft: '5%',
      borderColor: 'rgba(172, 43, 49, 0.3)',
      justifyContent: 'center',
      height: 64,
    },
  });
};
