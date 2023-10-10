import {CustomFonts} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    text: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    contentStyle: {paddingBottom: '6%'},
    imageContainer: {
      height: Dimensions.get('window').height * 0.76,
      width: '100%',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    buttonWrapper: {marginTop: 20},
  });
};
