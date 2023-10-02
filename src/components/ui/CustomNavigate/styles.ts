import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts} from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },

    navigationContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: '2%',
    },
    leftRightImgStyle: {
      height: 40,
      width: 40,
    },
    textStyle: {
      ...CustomFonts.header.small18,
      fontSize: 20,
      color: 'black',
      alignSelf: 'center',
    },
  });
};
