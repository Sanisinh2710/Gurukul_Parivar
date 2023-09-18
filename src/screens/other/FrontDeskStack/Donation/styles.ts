import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';

// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    dropdownStyle: {
      marginTop: '2%',
      backgroundColor: 'rgba(172,43,49,0.05)',
      paddingHorizontal: '2%',
      borderWidth: 1,
      borderColor: 'rgba(172, 43, 49, 0.1)',
      borderRadius: 12,
    },
    dropdownStyle2: {
      textAlignVertical: 'top',
      marginTop: '2%',
      backgroundColor: 'rgba(172,43,49,0.05)',
      paddingHorizontal: '2%',
      borderWidth: 1,
      borderColor: 'rgba(172, 43, 49, 0.1)',
      borderRadius: 12,
    },
  });
};
