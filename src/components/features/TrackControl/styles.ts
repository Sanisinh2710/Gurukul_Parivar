import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts} from '../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    trackControlContainer: {
      // position: 'absolute',
      // bottom: 0,
      backgroundColor: '#FFFFFF',
      height: 170,
      width: '100%',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 20,
      padding:20,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 6,
    },
    trackTitle: {
      ...CustomFonts.header.small18,
      fontSize: 16,
      color: '#000000',
      lineHeight: 20,
    },
    trackControlPlay: {
      height: 40,
      width: 40,
      borderRadius: 40,
      shadowColor: '#AC2B31',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.15,
      shadowRadius: 13.84,
      elevation: 7,
    },
    trackForwardControl: {
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:'3%',
    },
    forwardImage:{
      width:17,
      height:17,
    },
    trackProgressText:{
      ...CustomFonts.body.large14,
      fontSize: 12,
      color: '#171717',
      lineHeight: 16,
    }
  });
};
