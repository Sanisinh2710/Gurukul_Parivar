import {Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../../src/types';

export const CommonStyle = (theme: Theme) => {
  return StyleSheet.create({
    commonContainer: {
      flex: 1,
      width: Dimensions.get('window').width,
      backgroundColor: theme?.background,
    },
    commonContentView: {
      paddingHorizontal: 20,
    },
  });
};
