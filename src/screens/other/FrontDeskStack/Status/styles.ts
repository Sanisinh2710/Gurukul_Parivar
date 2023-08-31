import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    progressText: {
      ...CustomFonts.body.medium12,
      fontSize: 14,
      color: 'black',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 14,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: 'rgba(172, 43, 49, 0.3)',
      backgroundColor: 'white',
    },
  });
};
