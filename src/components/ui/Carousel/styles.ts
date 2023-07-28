import {Dimensions, StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {CustomFonts} from '../../../utils/fonts';

export const style = (currentPage?: number) => {
  return StyleSheet.create({
    snailMainView: {
      marginTop: 10,
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
      // backgroundColor: 'blue',
    },
    pagerViewImageView: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'yellow',
      borderRightColor: 'black',
    },

    pagerViewImage: {
      borderRadius: 12,

      marginTop: 24,
      width: 335,
      height: 164,
    },
  });
};
