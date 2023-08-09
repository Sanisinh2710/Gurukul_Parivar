import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
      lineHeight: 25.92,
    },
    content: {
      fontSize: 16,
      color: 'black',
      lineHeight: 25.92,
    },
    titleContainer: {
      marginTop: 20,
    },
    date: {
      marginTop: 8,
      fontSize: 14,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 18.9,
    },
    image: {
      height: 250,
      width: 355,
      borderRadius: 12,
    },
    imageContainer: {
      marginTop: '3%',
    },
  });
};
