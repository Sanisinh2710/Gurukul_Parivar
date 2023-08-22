import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    logoView: {
      // marginTop: 100,
      alignItems: 'center',
      marginBottom: 10,
    },
    logo: {
      width: 176,
      height: 163,
    },
    title: {
      ...CustomFonts.body.regular14,
      marginTop: 12,
      fontSize: 30,
      lineHeight: 40,
      fontWeight: '700',
      color: theme.textColor,
    },
    subtitleView: {
      marginTop: 10,
    },
    subtitle: {
      ...CustomFonts.body.medium12,
      fontSize: 16,
      color: theme.textColor,
      lineHeight: 21.6,
      fontWeight: '400',
    },
  });
};