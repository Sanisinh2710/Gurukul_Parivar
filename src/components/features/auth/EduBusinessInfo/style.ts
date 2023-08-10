import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    scrollViewContainer: {
      paddingBottom: '30%',
    },

    flatListContainer: {
      marginTop: 19,
      gap: 15,
      paddingBottom: '30%',
    },
    submitButtonView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    submitButtonStyle: {
      width: '47%',
    },
  });
};
