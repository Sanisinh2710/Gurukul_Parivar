import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const RegisterScreenstyle = () => {
  const theme = useAppSelector(state => state.theme.theme);

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
      lineHeight: 20,
      color: theme.textColor,
    },
    footerRedText: {
      color: theme.primary,
    },
  });
};
