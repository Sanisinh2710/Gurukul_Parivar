import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts} from '../../../utils';
// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    imageContainer: {
      height: 48,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 8,
    },
    listTitle: {
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
    },
    flatListContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: '2.5%',
      marginHorizontal: '2%',
      borderRadius: 12,
      height: 64,
      backgroundColor: '#ffffff',
    },
  });
};
