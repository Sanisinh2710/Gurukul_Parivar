import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },

    imageContainer: {
      height: 200,
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    images: {
      height: '100%',
      width: '100%',
      borderRadius: 8,
    },
    navigationContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    dropdownStyle: {
      marginTop: '2%',
      backgroundColor: 'rgba(172,43,49,0.05)',
      paddingHorizontal: '2%',
      borderWidth: 1,
      borderColor: 'rgba(172, 43, 49, 0.1)',
      borderRadius: 12,
    },
  });
};
