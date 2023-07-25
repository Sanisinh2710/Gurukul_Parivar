import {StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/colors';
import {CustomFonts} from '../../../utils/fonts';

export const Dropdownstyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
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
    modelView: {
      elevation: 5,
      marginTop: -370,
      height: 300,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    searchInput: {
      height: 50,
      borderColor: '#8e8e8e',
      borderRadius: 7,
      marginTop: 20,
      paddingLeft: 20,
    },
    ListView: {
      paddingHorizontal: 20,
      height: 50,
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderColor: '#8e8e8e',
    },
    ListFonts: {
      ...CustomFonts.header.small18,
      fontSize: 16,
    },
  });
};
