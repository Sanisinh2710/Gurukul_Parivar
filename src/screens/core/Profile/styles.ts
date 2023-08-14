import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';
import {useAppSelector} from '../../../redux/hooks';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    imageContainer: {
      flexDirection: 'row',
      borderWidth: 0.25,
      borderColor: 'rgba(172, 43, 49,0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 10,
      padding: 20,
      borderRadius: 8,
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
      borderWidth: 0.25,
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
      borderWidth: 0.25,
      borderColor: 'rgba(172,43,49,0.3)',
      borderRadius: 12,
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
  });
};
