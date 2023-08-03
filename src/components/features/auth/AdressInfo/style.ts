import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    checkboxFonts: {
      ...CustomFonts.body.medium12,
      fontSize: 14,
      fontWeight: '400',
      color: theme.textColor,
      lineHeight: 18.9,
    },
  });
};
