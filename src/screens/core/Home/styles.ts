import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts} from '../../../utils';
// import { CustomFonts } from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    name: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    WelcomeText2: {
      ...CustomFonts.body.large14,
      fontSize: 20,
      color: 'black',
      lineHeight: 30,
    },
    images: {
      justifyContent: 'flex-end',
      borderRadius: 12,
      height: 180,
      width: '47%',
      marginTop: 24,
    },
    textOverImage: {
      position: 'absolute',
      bottom: 5,
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
    },

    gridItem: {height: '100%', width: '100%'},
  });
};
