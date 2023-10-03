import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    images: {
      height: '100%',
      width: '100%',
      borderRadius: 8,
    },
    icon: {
      height: 24,
      width: 24,
    },
    iconContainer: {
      justifyContent: 'center',
      borderRadius: 60,
      alignItems: 'center',
      height: 48,
      width: 48,
    },
    navigationContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    wallpaperText: {
      fontSize: 20,
      color: 'black',
      marginHorizontal: 20,
      borderBottomWidth: 0.25,
      borderBottomColor: 'rgba(23,23,23,0.3)',
      paddingVertical: 15,
    },
  });
};
