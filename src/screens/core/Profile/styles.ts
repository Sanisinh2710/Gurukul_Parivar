import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.4,
      borderColor: 'rgba(172, 43, 49,0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 10,
      padding: 20,
      borderRadius: 8,
    },
    profileImgView: {
      height: 64,
      width: 64,
      overflow: 'hidden',
      borderRadius: 60,
    },
    profileImg: {
      height: '100%',
      width: '100%',
    },

    profileName: {
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
    },
    familyIdView: {
      height: 28,
      width: 116,
      backgroundColor: 'rgba(172, 43, 49, 0.1)',
      marginTop: '5%',
      justifyContent: 'center',
      borderRadius: 4,
    },
    familyIdText: {
      color: COLORS.primaryColor,
      fontSize: 12,
      textAlign: 'center',
    },
    mapContainer: {
      marginTop: 12,
      borderWidth: 0.4,
      borderColor: 'rgba(172, 43, 49,0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 8,
    },
    listView: {
      borderColor: 'rgba(23, 23, 23,0.1)',
      flexDirection: 'row',
      marginHorizontal: '5%',
      marginVertical: '3.5%',
      paddingBottom: '2.5%',
    },
    listName: {
      ...CustomFonts.body.medium12,
      fontSize: 16,
      color: 'black',
    },
    btnStyle: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: '5%',
      borderRadius: 10,
    },
    modalbtn: {
      width: '42%',
    },
    modalbtnView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: '8%',
    },
    modalTextContent: {
      color: 'rgba(23,23,23,0.5)',
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
      marginTop: 8,
    },
    languageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    modalHeader: {
      ...CustomFonts.header.small18,
      marginTop: 24,
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },
    deleteIcon: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    logoutIcon: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    iconContainer: {
      position: 'absolute',
      right: -12,
      height: '50%',
      width: '90%',
      alignItems: 'center',
    },
    iconRectangleView: {
      height: '40%',
      width: '30%',
      backgroundColor: 'rgba(172, 43, 49, 0.4)',
      borderRadius: 7,
      justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pictureUpdateIconView: {
      position: 'absolute',
      width: 28,
      height: 28,
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#3dadfc',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.15,
      shadowRadius: 13.84,
      elevation: 7,
      alignSelf: 'center',
      bottom: -10,
    },
    pictureUpdateText: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'black',
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(23,23,23,0.3)',
      paddingVertical: 20,
    },
    imageView: {
      height: 64,
      width: 64,
    },
    imageStyle: {
      height: '100%',
      width: '100%',
      borderRadius: 50,
    },
    pictureUpdateIcon: {
      height: 20,
      width: 20,
    },
    userNameView: {
      justifyContent: 'center',
      marginLeft: '5%',
    },
    flatlistNameView: {
      justifyContent: 'center',
      marginLeft: '5%',
    },
    langText: {
      color: COLORS.primaryColor,
      fontSize: 14,
    },
    arrow: {
      height: 24,
      width: 24,
    },
    linearGradientContainer: {
      height: 80,
      width: 80,
    },
    modelOption: {
      justifyContent: 'center',
    },
    textColor: {
      color: 'rgba(23,23,23,0.5)',
    },
    rightIcon: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    dropDownView: {
      alignItems: 'center',
    },
    dropDownImageContainer: {
      height: 250,
      width: 250,
    },
    dropDownImage: {
      height: '100%',
      width: '100%',
      borderRadius: 150,
    },
  });
};
