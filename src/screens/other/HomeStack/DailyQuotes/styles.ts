import {Dimensions, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../../utils';

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
    },
    dropDownContainer: {
      height: 60,
      marginBottom: '16%',
    },
    dropDownHeading: {
      ...CustomFonts.body.large14,
      color: COLORS.lightModetextColor,
      fontSize: 15,
    },
    dropDownStyle :{
      marginTop: '2%',
      backgroundColor: 'rgba(172,43,49,0.05)',
      paddingHorizontal: '2%',
      borderWidth: 1,
      borderColor: 'rgba(172, 43, 49, 0.1)',
      borderRadius: 12,
    },
    quoteContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3%',
    },
    carouselView:{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    activityIndicator:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
  });
};
