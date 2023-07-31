import {Dimensions, StyleSheet} from 'react-native';
import {useAppSelector} from '../../src/redux/hooks';

export const CommonStyle = () => {
  // const {theme} = useCustomTheme();
  const theme = useAppSelector(state => state.theme.theme);
  return StyleSheet.create({
    commonContainer: {
      flex: 1,
      width: Dimensions.get('window').width,
      backgroundColor: theme.background,
    },
    commonContentView: {
      paddingHorizontal: 20,
    },
  });
};
