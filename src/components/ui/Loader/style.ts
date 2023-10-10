import {Dimensions, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../utils';

export const loaderStyle = () => {
  return StyleSheet.create({
    loaderMainView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    androidLoaderinnerView: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      elevation: 10,
      height: Dimensions.get('window').height * 0.1,
      width: Dimensions.get('window').width * 0.8,
    },
    iosLoaderInnerView: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: 'grey',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.6,
      shadowRadius: 2,
      height: Dimensions.get('window').height * 0.1,
      width: Dimensions.get('window').width * 0.8,
    },
    loaderText: {
      color: 'black',
      fontSize: 18,
      fontWeight: '500',
    },
  });
};
