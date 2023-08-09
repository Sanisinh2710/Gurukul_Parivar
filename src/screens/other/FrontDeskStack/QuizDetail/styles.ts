import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    progressText: {
      ...CustomFonts.header.large36,
      fontSize: 24,
      color: 'black',
    },
  });
};
