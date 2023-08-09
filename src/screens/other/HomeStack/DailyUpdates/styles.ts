import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 14,
      color: 'black',
      lineHeight: 20,
    },
    updateContainer: {
      flexDirection: 'row',
      width: '100%',
      padding: 5,
      backgroundColor: 'white',
      borderWidth: 1,
      marginTop: 20,
      borderColor: 'rgba(172, 43, 49, 0.3)',
      borderRadius: 10,
    },
    textContainer: {
      // borderWidth: 1,
      width: '80%',
      alignSelf: 'center',
      // paddingHorizontal: 20,
    },
    time: {
      color: 'rgba(23,23,23,0.5)',
      fontSize: 12,
      lineHeight: 16.5,
    },
    image: {
      height: 44,
      width: 44,
    },
    imageContainer: {
      borderRadius: 60,
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5%',
      marginBottom: '20%',
      padding: 5,
    },
  });
};
