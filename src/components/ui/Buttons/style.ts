import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';

export const ButtonStyles = () => {
  return StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: 12,
    },
    pressableButtonstyle: {
      borderRadius: 12,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    titleText: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 21.6,
      color: COLORS.darkModetextColor,
    },
  });
};
