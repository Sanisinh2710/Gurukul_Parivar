import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

export const useOtpStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primaryColor,
    },
    otpWrapper: {
      marginTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(172, 43, 49, 0.1)',
      borderRadius: 12,
    },

    textInput: {
      height: 50,
      width: 50,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: 'rgba(172, 43, 49, 0.18)',
      textAlign: 'center',
      //   ...typography.body.thin,
      fontWeight: 'bold',
      //   color: color.primaryText,
      fontSize: 20,
    },
  });
};
