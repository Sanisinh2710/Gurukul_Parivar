import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    NoDataTitle: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 27,
    },
    mainWrapperStyle: {flex: 1, justifyContent: 'center', gap: 50},
    soon: {
      alignSelf: 'center',
      marginVertical: '3%',
      ...CustomFonts.body.large14,
      color: COLORS.primaryColor,
      lineHeight: 32,
      fontSize: 24,
    },
    NoDataContent: {
      alignSelf: 'center',

      ...CustomFonts.body.large14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18,
      fontSize: 16,
    },
    commingSoonImgstyle: {
      width: 213,
      height: 87,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    primaryButtonStyle: {paddingHorizontal: 20, flex: 0.2},
  });
};
