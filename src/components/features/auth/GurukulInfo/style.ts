import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    scrollViewContainer: {paddingTop: '3%', paddingBottom: '30%'},
    removeBtnView: {
      height: 30,
      width: 30,
      marginTop: '5%',
      alignSelf: 'flex-end',
    },
    removeImg: {
      width: '100%',
      height: '100%',
    },
    flatListContainer: {
      gap: 16,
      paddingTop: '4%',
      paddingBottom: '2%',
    },
    flatListColumnWrap: {
      justifyContent: 'space-between',
    },
    arrayTypeFlatListView: {
      width: '48%',
    },
    relativeFlatListContainer: {paddingBottom: '8%', gap: 16},
    submitBtn: {marginTop: '5%'},
  });
};
