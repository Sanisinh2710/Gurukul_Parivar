import {Theme} from '@types';
import {Dimensions, StyleSheet} from 'react-native';

export const BottomNavStyle = (theme?: Theme) =>
  StyleSheet.create({
    barStyle: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: Dimensions.get('window').width,
      bottom: 0,
      height: 75,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
    },
    innerViewButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
    },
    bottomBarLine: {
      borderColor: theme?.primary,
      width: 27,
      height: 6,
      position: 'absolute',
      top: 0,
      borderBottomWidth: 4,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
  });
