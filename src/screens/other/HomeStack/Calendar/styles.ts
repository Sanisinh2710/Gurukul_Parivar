import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  const {width, height} = Dimensions.get('window');

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
    },
    date: {
      ...CustomFonts.header.medium20,
      color: 'white',
    },
    day: {
      ...CustomFonts.body.small10,
      fontSize: 16,
      color: 'white',
    },
    content1: {
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
      lineHeight: 18.9,
    },
    content2: {
      fontSize: 14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18.9,
    },
    textBoxContainer: {
      width: '100%',
      height: 64,
      flexDirection: 'row',
    },
    dateContainer: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: '20%',
      borderWidth: 0.4,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      height: 64,
      backgroundColor: COLORS.primaryColor,
    },
    contentContainer: {
      width: '80%',
      borderWidth: 0.4,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: 'white',
      paddingLeft: '5%',
      borderColor: 'rgba(172, 43, 49, 0.3)',
      justifyContent: 'center',
      height: 64,
    },
    scrollViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    calenderContainer: {
      height: height * 0.8,
    },
    calenderEventView: {
      height: '25%',
      marginTop: 10,
    },
    eventContentStyle: {
      gap: 15,
      marginTop: 10,
      paddingBottom: 15,
    },
    calenderImageContainer: {
      alignItems: 'center',
    },
    calenderImageView: {
      height: 264,
      width: 345,
    },
    calenderImageStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
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
      ...CustomFonts.body.large14,
      fontSize: 18,
      color: '#3A3B3C',
    },
  });
};
