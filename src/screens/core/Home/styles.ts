import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {CustomFonts} from '../../../utils';
// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    name: {
      ...CustomFonts.header.large36,
      fontSize: 24,
      color: 'black',
    },
    WelcomeText2: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    images: {
      justifyContent: 'flex-end',
      borderRadius: 12,
      height: 169,
      width: 160,
      marginTop: 24,
    },
    textOverImage: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      ...CustomFonts.body.large14,
      color: 'white',
      fontSize: 18,
      paddingVertical: 3,
      textAlign: 'center',
    },
  });
};
