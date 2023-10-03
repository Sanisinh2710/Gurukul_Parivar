import {useAppSelector} from '@redux/hooks';
import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const LoginScreenstyle = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    headerView: {
      gap: 10,
      marginTop: '5%',
    },
    loginContainerStyle: {paddingBottom: '5%'},
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
      lineHeight: 43,
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
      gap: 15,
    },
    mobilenumText: {
      ...CustomFonts.body.large14,
      color: theme.textColor,
    },
    footerView: {
      marginTop: 26,
      gap: 13,
    },
    footerTextsView: {
      gap: 13,
      alignItems: 'center',
    },
    footerText1: {
      ...CustomFonts.body.large14,
      lineHeight: 20,
      color: theme.textColor,
    },
    footerRedText: {
      color: theme.primary,
    },
    footerText2: {
      ...CustomFonts.body.large14,
      fontSize: 15,
      lineHeight: 20,
      color: theme.textColor,
    },
    footerText3: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      lineHeight: 20,
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      color: theme.primary,
    },
    FooterInputs: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      justifyContent: 'space-between',
    },
    rememberMeViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    filledBoxView: {
      width: 16,
      height: 16,
      alignItems: 'center',
    },
    filledBoxTick: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    emptyBoxView: {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderColor: theme.primary,
      borderWidth: 1,
    },
    rememeberMeText: {
      ...CustomFonts.body.regular14,
      color: 'rgba(63, 63, 63, 1)',
    },
    forgotPassText: {
      ...CustomFonts.body.regular14,
      color: theme.primary,
    },
  });
};
