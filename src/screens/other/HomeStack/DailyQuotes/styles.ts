import {Dimensions, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    image: {
      height: Dimensions.get('window').height * 0.58,
      width: '100%',
      borderRadius: 10,
    },
  });
};
