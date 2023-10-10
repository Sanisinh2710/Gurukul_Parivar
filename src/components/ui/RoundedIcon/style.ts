import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 60,
      height: 40,
      width: 40,
    },
    roundIconImg: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
    },
  });
};
