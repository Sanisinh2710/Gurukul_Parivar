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
      // paddingVertical: 15,
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
      height: 54,
      width: 54,
    },
    imageContainer: {
      // width: '20%',
      borderRadius: 60,
      borderWidth: 1,
      borderColor: COLORS.primaryColor,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      // marginLeft: '2%',
    },
  });
};
