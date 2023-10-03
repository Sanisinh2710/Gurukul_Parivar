import {useAppSelector} from '@redux/hooks';
import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const ForgotPasswordstyle = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    headerView: {
      gap: 10,
      marginTop: '5%',
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
      ...CustomFonts.header.small18,
      color: COLORS.resetSubtitleColor,
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
