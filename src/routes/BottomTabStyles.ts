import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../hooks';

// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    bottomBarLine: {
      borderColor: theme.primary,
      width: 27,
      height: 4,
      position: 'absolute',
      top: 0,
      borderBottomWidth: 4,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    // barContainer: {
    //   height: 60,
    // },
  });
};
