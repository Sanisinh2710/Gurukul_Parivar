import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const FormInputStyle = (value: any) => {
  const {theme} = useCustomTheme();
  return StyleSheet.create({
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '100%',
      color: theme.textColor,
      opacity: value ? 1 : 0.5,
    },
    labelText: {
      ...CustomFonts.body.medium12,
      fontSize: 16,
      fontWeight: '400',
      color: theme.textColor,
    },
    fieldBlockView: {
      marginTop: 8,
      width: '100%',
      height: 60,
      paddingHorizontal: '3%',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primaryInputBackgroundColor,
      borderWidth: 2,
    },
    errorText: {
      ...CustomFonts.body.large14,
      marginTop: '1%',
      fontSize: 16,
      color: 'red',
    },
    phoneDropFirstView: {
      width: '20%',
      height: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneDropFirstViewText: {
      ...CustomFonts.body.large14,
      color: theme.textColor,
      fontSize: 16,
    },
    phoneDropFirstViewRightBorder: {
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.primary,
      opacity: 0.2,
    },
    phoneTextView: {
      width: '80%',
      paddingLeft: '5%',
    },
  });
};
