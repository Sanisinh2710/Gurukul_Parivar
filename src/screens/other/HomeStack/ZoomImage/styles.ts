import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    images: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    focalPoint: {
      ...StyleSheet.absoluteFillObject,
      width: 20,
      height: 20,
      backgroundColor: 'white',
      borderRadius: 60,
    },
  });
};
