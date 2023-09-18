/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const genstyle = () => {
  const theme = useAppSelector(state => state.theme.theme);

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
    },
    itemView: {
      borderWidth: 1,
      borderColor: COLORS.primaryLightBorderColor,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      paddingHorizontal: 16,
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
