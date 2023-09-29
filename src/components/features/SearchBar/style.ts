import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    modelSearchView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      height: 50,
      marginTop: 12,
      paddingHorizontal: 15,
      marginBottom: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 3,
    },
    iconView: {
      width: 23,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '80%',
      color: COLORS.lightModetextColor,
      opacity: 1,
      marginLeft: 8,
    },
  });
};
