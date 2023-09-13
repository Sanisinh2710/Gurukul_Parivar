import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    modelSearchView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: 50,
      marginTop: 12,
      paddingHorizontal: 15,
      marginBottom: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 2,
    },
    iconView: {
      width: 23,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '100%',
      color: COLORS.lightModetextColor,
      opacity: 1,
      marginLeft: 8,
    },
  });
};
