import {useAppSelector} from '@redux/hooks';
import {RootState} from '@redux/store';
import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const FormInputStyle = (value?: any) => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return StyleSheet.create({
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '100%',
      color: theme.textColor,
      opacity: value ? 1 : 0.5,
      left: -4,
      height: '100%',
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
      paddingHorizontal: 10,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primaryInputBackgroundColor,
      borderWidth: 1,
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
      justifyContent: 'center',
    },
    photOutSideView: {
      height: 110,
      width: 110,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: COLORS.primaryColor,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
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
    chevronArrowView: {
      width: '15%',
      height: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chevronArrow: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
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
    simpleDropDownMianView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    rightSideImgView: {
      width: 30,
      height: 30,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightSideImgStyle: {
      flex: 1,
      resizeMode: 'contain',
    },
    fieldImgView: {
      height: '40%',
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fieldRightImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    multiSelectMainView: {
      flexDirection: 'row',
      top: 10,
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: '3%',
    },
    multiSelectInnerView: {
      flexDirection: 'row',
      backgroundColor: COLORS.primaryColor,
      paddingLeft: 16,
      paddingRight: 10,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 60,
      gap: 10,
    },
    multiSelectTitle: {
      ...CustomFonts.body.large14,
      lineHeight: 18.9,
      color: COLORS.darkModetextColor,
    },
    multiSelectListView: {
      width: 14,
      height: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    multiSelectRemoveImg: {
      flex: 1,
      tintColor: COLORS.darkModeIconColor,
      resizeMode: 'contain',
    },
    datePickerMainView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    datePickerDateImg: {
      width: 30,
      height: 30,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
