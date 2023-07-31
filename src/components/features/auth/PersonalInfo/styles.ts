import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';

export const PersonalInfoStyle = () => {
  const theme = useAppSelector(state => state.theme.theme);
  return StyleSheet.create({});
};
