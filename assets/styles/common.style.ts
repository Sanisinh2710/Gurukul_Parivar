import {Dimensions, StyleSheet} from 'react-native';

export const CommonStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('window').width,
      backgroundColor: '#ffffff',
    },
  });
};
