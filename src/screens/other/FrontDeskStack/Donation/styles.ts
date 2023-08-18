import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';

// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({});
};
