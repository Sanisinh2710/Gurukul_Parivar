import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const FormInputStyle = (value?: any) => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '100%',
      color: theme.textColor,
      opacity: value ? 1 : 0.5,
    },
    labelText: {
      ...CustomFonts.body.medium12,
      fontSize: 16,
      fontWeight: '400',
      color: theme.textColor,
    },
    fieldBlockView: {
      marginTop: 8,
      width: '100%',
      height: 60,
      paddingHorizontal: '3%',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primaryInputBackgroundColor,
      borderWidth: 2,
    },
    errorText: {
      ...CustomFonts.body.large14,
      marginTop: '1%',
      fontSize: 16,
      color: 'red',
    },
    phoneDropFirstView: {
      width: '20%',
      height: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneDropFirstViewText: {
      ...CustomFonts.body.large14,
      color: theme.textColor,
      fontSize: 16,
    },
    phoneDropFirstViewRightBorder: {
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.primary,
      opacity: 0.2,
    },
    phoneTextView: {
      width: '80%',
      paddingLeft: '5%',
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
      // marginTop: 10,
      // height: 50,
      // borderRadius: 10,
      // borderWidth: 1,
      // backgroundColor: COLORS.primaryLightColor,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // paddingLeft: 15,
      // paddingRight: 15,
    },
    placeholderFonts: {
      ...CustomFonts.body.regular14,
      fontSize: 16,
      color: theme.textColor,
    },
  });
};
