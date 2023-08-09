import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../utils';
import {useAppSelector} from '../../../redux/hooks';
// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    name: {
      ...CustomFonts.header.large36,
      fontSize: 24,
      color: 'black',
    },
    WelcomeText2: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    images: {
      justifyContent: 'flex-end',
      borderRadius: 12,
      height: 169,
      width: '47%',
      marginTop: 24,
    },
    textOverImage: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      ...CustomFonts.body.large14,
      color: 'white',
      fontSize: 18,
      paddingVertical: 3,
      textAlign: 'center',
    },
    gridContainer: {
      paddingHorizontal: 10,
      height: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },

    gridItem: {height: '100%', width: '100%'},
  });
};
