import {useAppSelector} from '@redux/hooks';
import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

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
    songContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-between',
      marginVertical: 5,
      borderWidth: 0.5,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
    },
    songTitle: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: '#000000',
      lineHeight: 23.5,
    },
    songArtist: {
      ...CustomFonts.body.small10,
      fontSize: 13,
      lineHeight: 17.3,

      color: 'rgba(23, 23, 23, 0.5)',
    },
    trackControlContainer: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#FFFFFF',
      height: 185,
      width: '100%',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      padding: 20,
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
      shadowColor: '#3dadfc',
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
      marginTop: '3%',
    },
    forwardImage: {
      width: 17,
      height: 17,
    },
    trackProgressText: {
      ...CustomFonts.body.large14,
      fontSize: 12,
      color: '#171717',
      lineHeight: 16,
    },
  });
};
