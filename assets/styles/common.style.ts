import {Dimensions, StyleSheet} from 'react-native';

export const CommonStyle = () => {
  // const {theme} = useCustomTheme();
  return StyleSheet.create({
    commonContainer: {
      flex: 1,
      width: Dimensions.get('window').width,
      // backgroundColor: theme.background,
    },
    commonContentView: {
      paddingHorizontal: 20,
    },
  });
};
