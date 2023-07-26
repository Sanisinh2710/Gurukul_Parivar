import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/colors';
import {CustomFonts} from '../../../utils/fonts';

export const Dropdownstyles = () => {
  return StyleSheet.create({
    container: {
      // flex: 1,
    },
    contentView: {
      marginTop: 8,
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
      ...CustomFonts.header.small18,
      fontSize: 16,
    },
    mainView: {
      flex: 1,
      justifyContent: 'flex-end',
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0,0,0,0.5)',
      bottom: 0,
    },
    modelView: {
      height: Dimensions.get('window').height * 0.98,
      backgroundColor: '#ffffff',
      elevation: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    searchInput: {
      paddingLeft: 10,
      height: 50,
      borderWidth: 1,
      borderRadius: 7,
      marginBottom: 24,
      marginHorizontal: 20,
    },
    ListView: {
      marginHorizontal: 20,
      height: 50,
      justifyContent: 'center',
    },
    ListFonts: {
      ...CustomFonts.header.small18,
      fontSize: 16,
    },
    button: {
      backgroundColor: 'rgba(60, 60, 67, 0.3)',
      marginTop: 10,
      marginBottom: 10,
      height: 5,
      width: 36,
      alignSelf: 'center',
    },
  });
};
