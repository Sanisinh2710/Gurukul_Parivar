import {CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.large36,
      color: 'black',
    },
    imageContainer: {
      height: 98,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 8,
      backgroundColor: '#ffffff',
    },
    listTitle: {
      marginTop: '10%',
      ...CustomFonts.header.medium20,
      fontSize: 16,
      color: 'black',
      textAlign: 'center',
    },
    boxView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    boxViewInnerView: {
      width: '33.33%',
      marginVertical: 25,
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
    contentContainerStyle: {
      paddingBottom: '30%',
    },
    dashboardImagesContainer: {
      marginBottom: '2%',
    },
    container: {
      flex: 1,
    },
    flatlistContainer: {
      marginTop: '5%',
    },
    image: {height: 24, width: 24},
    titleWrapper: {justifyContent: 'center', marginLeft: '2%'},
  });
};
