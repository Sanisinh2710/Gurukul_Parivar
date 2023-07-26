import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../src/utils/colors';

export const CommonStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    contentView: {
      paddingHorizontal: 20,
    },
  });
};
