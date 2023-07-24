import {Dimensions, StyleSheet} from 'react-native';
import {CustomFonts} from '../../../../utils/fonts';
import {COLORS} from '../../../../utils/colors';

export const styles = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    logoView: {
      marginTop: 100,
      alignItems: 'center',
      marginBottom: 10,
    },
    logo: {
      width: 176,
      height: 163,
    },
    title: {
      ...CustomFonts.body.regular14,
      fontSize: 30,
      fontWeight: '700',
      color: COLORS.headingColor,
    },
    subtitleView: {
      marginTop: 5,
    },
    subtitle: {
      ...CustomFonts.body.medium12,
      fontSize: 16,
      color: COLORS.black,
      lineHeight: 21,
      fontWeight: '400',
    },
  });
};
