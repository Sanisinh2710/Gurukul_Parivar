import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../../hooks';
import {CustomFonts} from '../../../../utils/fonts';

export const LoginScreenstyle = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    headerView: {
      gap: 10,
      marginTop: '5%',
    },
    imgLogoView: {
      width: 130,
      height: 130,
      flexDirection: 'row',
      alignItems: 'center',
    },
    imgLogo: {
      flex: 1,
      resizeMode: 'contain',
    },
    welcomeTitleView: {
      marginTop: 10,
    },
    welcomeTitle1Text: {
      ...CustomFonts.body.regular14,
      fontSize: 34,
      color: theme.textColor,
    },
    welcomeTitle2Text: {
      ...CustomFonts.header.large36,
      color: theme.primary,
    },
    welcomeSubtitleText: {
      ...CustomFonts.body.large14,
      color: theme.textColor,
      marginTop: '1.5%',
      opacity: 0.5,
    },
    formInputsView: {
      marginTop: '10%',
    },
    mobilenumText: {
      ...CustomFonts.body.large14,
      color: theme.textColor,
    },
    footerView: {
      marginTop: 32,
      gap: 15,
    },
    footerText: {
      ...CustomFonts.body.large14,
      lineHeight: 16.2,
      color: theme.textColor,
    },
    footerRedText: {
      color: theme.primary,
    },
  });
};
