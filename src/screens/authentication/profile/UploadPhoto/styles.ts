import {Dimensions, StyleSheet} from 'react-native';
import {CustomFonts} from '../../../../utils/fonts';
import {COLORS} from '../../../../utils/colors';

export const styles = () => {
  return StyleSheet.create({
    FirstSubtitleView: {
      marginTop: 24,
    },
    FirstSubtitle: {
      ...CustomFonts.body.regular14,
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.headingColor,
    },
    SecondSubtitle: {
      ...CustomFonts.body.regular14,
      marginTop: 8,
      lineHeight: 18.9,
      fontSize: 15,
    },
    photoMainView: {
      alignItems: 'center',
      marginTop: 40,
    },
    photOutSideView: {
      height: 110,
      width: 110,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: COLORS.primaryColor,
      borderRadius: 60,
      padding: 8,
    },
    photoView: {
      backgroundColor: 'rgba(172, 43, 49, 0.1)',
      height: 94,
      width: 94,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 90,
      width: 90,
      borderRadius: 60,
    },
    avtar: {
      height: 39.41,
      width: 30,
    },
    photoBottomText: {
      ...CustomFonts.body.regular14,
      color: COLORS.primaryColor,
      marginTop: 12,
      lineHeight: 18.9,
    },
    BottomView: {
      marginTop: 40,
    },
    BottomSubtitle1: {
      ...CustomFonts.body.regular14,
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.headingColor,
    },
    BottomSubtitle2: {
      ...CustomFonts.body.regular14,
      marginTop: 8,
      lineHeight: 18.9,
      fontSize: 15,
    },
    DropdownTitle: {
      ...CustomFonts.header.small18,
      marginTop: 24,
    },
    NextBtn: {
      width: 335,
      hieght: 50,
      marginTop: 100,
      // paddingBottom: 40,
      alignSelf: 'center',
    },
  });
};
