import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  return StyleSheet.create({
    headerText: {
      ...CustomFonts.header.large36,
      color: COLORS.headingColor,
    },
    headerSubText: {
      ...CustomFonts.body.regular14,
      color: 'grey',
    },
    container: {
      marginHorizontal: 20,
    },
    textWrapper: {
      marginTop: 16,
    },
    otpContainer: {
      marginTop: 48,
    },
    otpContainerHeader: {
      ...CustomFonts.body.regular14,
      fontSize: 16,
      color: COLORS.black,
      textAlign: 'center',
    },
    phoneNumber: {
      ...CustomFonts.header.small18,
      color: COLORS.primaryColor,
      fontSize: 14,
    },
    editIconStyle: {
      height: 24,
      width: 24,
      // borderWidth: 1,
      backgroundColor: COLORS.sunray,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonStyle: {
      borderRadius: 12,
    },
    buttonText: {
      ...CustomFonts.body.regular14,
      fontSize: 16,
    },
    smallText: {
      ...CustomFonts.body.regular14,
      color: COLORS.black,
    },
    otpResend: {
      ...CustomFonts.header.small18,
      color: COLORS.primaryColor,
    },
    otpTextInputStyle: {
      borderWidth: 1,
      borderRadius: 12,
      borderBottomWidth: 1,
      backgroundColor: 'rgba(172, 43, 49, 0.1)',
    },
    phoneEditContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      gap: 10,
    },
    otpNotRecieveContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 57,
      justifyContent: 'center',
    },
  });
};
