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
    },
    icon: {
      height: 28,
      width: 28,
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
  });
};
