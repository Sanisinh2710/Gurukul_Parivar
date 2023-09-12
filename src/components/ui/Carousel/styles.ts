import {StyleSheet} from 'react-native';
import {COLORS} from '../../../utils';

export const style = (currentPage?: number) => {
  return StyleSheet.create({
    snailMainView: {
      marginTop: '4%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeSnail: {
      backgroundColor: 'rgba(172, 43, 49, 1)',
      borderRadius: 30,
      width: 8,
      height: 8,
      marginHorizontal: 3,
    },
    inactiveSnail: {
      backgroundColor: 'rgba(172, 43, 49, 0.2)',
      borderRadius: 30,
      width: 8,
      height: 8,
      marginHorizontal: 3,
    },
    pagerViewMainView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pagerViewImageView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: 'black',
      width: '100%',
      paddingHorizontal: 28,
      height: 164,
    },
    pagerViewImage: {
      borderRadius: 12,
      marginTop: 24,
      backgroundColor: COLORS.primaryRippleColor,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
};
