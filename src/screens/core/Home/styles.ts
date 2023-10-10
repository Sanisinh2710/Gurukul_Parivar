import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    name: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    WelcomeText2: {
      ...CustomFonts.body.large14,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    images: {
      justifyContent: 'flex-end',
      borderRadius: 12,
      height: 180,
      width: '47%',
      marginTop: 24,
    },
    textOverImage: {
      position: 'absolute',
      bottom: 5,
      right: 0,
      left: 0,
      ...CustomFonts.body.large14,
      color: 'white',
      fontSize: 18,
      paddingVertical: 3,
      textAlign: 'center',
    },
    gridContainer: {
      paddingHorizontal: 10,
      height: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    gridItem: {
      height: '100%',
      width: '100%',
    },
    linearGradientView: {
      height: '100%',
      width: '100%',
    },
    linearGradientStyle: {
      flex: 1,
      borderRadius: 12,
    },
    imageBgStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    contentContainerStyle: {
      paddingBottom: '30%',
    },
    WelcomeTextContainer: {
      flexDirection: 'row',
    },
    id: {
      fontSize: 18,
      color: COLORS.primaryColor,
    },
    submitButtonView: {
      marginTop: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
    },
    submitButtonStyle: {
      marginHorizontal: 5,
      width: '50%',
      marginBottom: '10%',
    },
    exitText: {
      ...CustomFonts.header.small18,
      color: COLORS.black,
      fontSize: 17,
      textAlign: 'center',
    },
    exitModelView: {
      backgroundColor: COLORS.white,
      height: 250,
      width: '85%',
      borderRadius: 12,
      justifyContent: 'flex-end',
      paddingHorizontal: '7%',
    },
    exitModelLogo: {
      height: 70,
      width: 70,
      borderRadius: 60,
      padding: 5,
      backgroundColor: COLORS.white,
      alignSelf: 'center',
      position: 'absolute',
      top: '-10%',
    },
  });
};
