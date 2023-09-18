import {Dimensions, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    image: {
      resizeMode:'contain',
      height:'100%',
      width: '100%',
    },
    quote:{
      ...CustomFonts.body.large14,
      fontSize:16,
      color: 'black',
      lineHeight:20,
    }
  });
};
