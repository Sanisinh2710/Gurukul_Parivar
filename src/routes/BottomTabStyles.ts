import {StyleSheet} from 'react-native';
import {useAppSelector} from '../redux/hooks';

// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);
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
  });
};
