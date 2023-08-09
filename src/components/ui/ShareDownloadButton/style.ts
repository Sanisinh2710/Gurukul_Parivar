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
    images: {
      height: '100%',
      width: '100%',
      borderRadius: 8,
    },
    icon: {
      height: 24,
      width: 24,
    },
    iconContainer: {
      justifyContent: 'center',
      borderRadius: 60,
      alignItems: 'center',
      height: 48,
      width: 48,
    },
    navigationContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
  });
};