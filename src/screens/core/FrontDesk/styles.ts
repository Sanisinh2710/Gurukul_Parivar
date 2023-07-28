import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {CustomFonts} from '../../../utils';
// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
  });
};
