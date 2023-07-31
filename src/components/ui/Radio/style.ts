import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const genstyle = () => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    heading: {
      ...CustomFonts.body.medium12,
      marginVertical: 8,
      lineHeight: 18.9,
      fontSize: 15,
      color: theme.textColor,
    },
    innerView: {
      flexDirection: 'row',
      gap: 10,
      // justifyContent: 'space-between',
    },
    itemView: {
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      flexDirection: 'row',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      paddingHorizontal: 16,
      gap: 2,
    },
    icon: {
      height: 20,
      width: 20,
    },
    lable: {
      ...CustomFonts.body.regular14,
      lineHeight: 21.6,
      fontSize: 14,
    },
  });
};
