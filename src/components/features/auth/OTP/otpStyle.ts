import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../utils';

export const useOtpStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primaryColor,
    },
    otpWrapper: {
      marginTop: 24,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    textInput: {
      backgroundColor: 'rgba(172, 43, 49, 0.1)',
      height: 50,
      width: '15%',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: 'rgba(172, 43, 49, 0.18)',
      textAlign: 'center',
      fontWeight: 'bold',
      color: COLORS.black,
      fontSize: 20,
    },
  });
};
