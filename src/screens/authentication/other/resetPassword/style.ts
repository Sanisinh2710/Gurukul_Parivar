import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../../utils';

export const ResetPasswordstyle = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    headerView: {
      marginTop: '5%',
    },
    welcomeTitleView: {
      marginTop: 10,
      gap: 10,
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
      marginTop: '5%',
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