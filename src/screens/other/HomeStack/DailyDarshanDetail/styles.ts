import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    images: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    icon: {
      height: 28,
      width: 28,
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
