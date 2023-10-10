import {COLORS, CustomFonts} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    text: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    wrapperView: {flex: 1, marginTop: '3%'},
    modelSearchView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E6E6E6',
      borderRadius: 10,
      height: 50,
      marginTop: 12,
      paddingHorizontal: 15,
      marginBottom: 12,
    },
    iconView: {
      width: 23,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '80%',
      color: COLORS.lightModetextColor,
      opacity: 1,
      marginLeft: 8,
    },
    content1: {
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
      lineHeight: 22.9,
    },
    content2: {
      fontSize: 14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 22.9,
    },
    textBoxContainer: {
      // backgroundColor: 'yellow',
      height: 'auto',
      width: '100%',
      flexDirection: 'row',
      marginVertical: '3%',
    },
    dateContainer: {
      padding: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: '20%',
      borderWidth: 0.4,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      backgroundColor: COLORS.primaryColor,
    },
    contentContainer: {
      width: '80%',
      borderWidth: 0.4,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: 'white',
      paddingLeft: '5%',
      paddingRight: '2%',
      borderColor: 'rgba(172, 43, 49, 0.3)',
      justifyContent: 'center',
    },
    date: {
      ...CustomFonts.header.medium20,
      fontSize: 22,
      color: 'white',
    },
    day: {
      ...CustomFonts.body.small10,
      fontSize: 16,
      color: 'white',
    },
    timeContainer: {
      flexDirection: 'row',
      width: '70%',
      gap: 6,
    },
    dropDownView: {
      alignItems: 'center',
      backgroundColor: COLORS.lightModeBackgroundColor,
      height: 'auto',
      width: '85%',
      borderRadius: 10,
    },
    dropDownImageContainer: {
      width: '100%',
    },
    modalDateContainer: {
      backgroundColor: COLORS.primaryColor,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      height: 60,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    modalDateText: {
      ...CustomFonts.header.medium20,
      color: COLORS.darkModetextColor,
    },
    modalTitleContainer: {
      paddingHorizontal: 15,
      marginVertical: 15,
    },
    modalTitle: {
      ...CustomFonts.header.small18,
      fontSize: 18,
      textAlign: 'justify',
      color: COLORS.black,
    },
    modalTimeContainer: {
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    modalTime: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: COLORS.primaryColor,
    },
    noDataView: {
      height: Dimensions.get('window').height * 0.65,
    },
  });
};
