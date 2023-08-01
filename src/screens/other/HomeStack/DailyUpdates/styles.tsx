import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../../utils';
import {useAppSelector} from '../../../../redux/hooks';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
  });
};
