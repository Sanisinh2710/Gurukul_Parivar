import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../../hooks';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    FirstSubtitleView: {
      marginTop: 24,
    },
    FirstSubtitle: {
      ...CustomFonts.body.regular14,
      fontSize: 18,
      fontWeight: '700',
      color: theme.textColor,
    },
    SecondSubtitle: {
      ...CustomFonts.body.regular14,
      marginTop: 8,
      lineHeight: 18.9,
      fontSize: 15,
      color: theme.textColor,
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
      color: theme.textColor,
    },
    BottomSubtitle2: {
      ...CustomFonts.body.regular14,
      marginTop: 8,
      lineHeight: 18.9,
      fontSize: 15,
      color: theme.textColor,
    },
    DropdownTitle: {
      ...CustomFonts.header.small18,
      marginTop: 24,
    },
    NextBtn: {
      width: 335,
      marginTop: 50,
      alignSelf: 'center',
    },
    contentView: {
      marginTop: 10,
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: COLORS.primaryLightColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15,
    },
    placeholderFonts: {
      ...CustomFonts.body.regular14,
      fontSize: 16,
      color: theme.textColor,
    },
  });
};
