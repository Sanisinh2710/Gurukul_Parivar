import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 14,
      color: 'black',
      lineHeight: 20,
    },
    updateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 5,
      backgroundColor: 'white',
      borderWidth: 1,
      marginTop: 20,
      borderColor: 'rgba(172, 43, 49, 0.3)',
      borderRadius: 10,
    },
    textContainer: {
      width: '80%',
      alignSelf: 'center',
    },
    time: {
      color: 'rgba(23,23,23,0.5)',
      fontSize: 12,
      lineHeight: 16.5,
    },
    image: {
      height: 44,
      width: 44,
    },
    imageContainer: {
      borderRadius: 60,
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5%',
      marginBottom: '20%',
      padding: 5,
    },
  });
};
