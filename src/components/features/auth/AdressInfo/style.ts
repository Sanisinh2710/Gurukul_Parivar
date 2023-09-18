import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  return StyleSheet.create({
    scrollViewContainer: {
      paddingBottom: '30%',
    },
    flatListContainer: {
      gap: 16,
      marginTop: '5%',
    },
    _flatListContainer: {
      marginTop: '0%',
    },
    cancelImgView: {
      marginTop: '10%',
      height: 30,
      width: 30,
      alignSelf: 'flex-end',
    },
    cancelImg: {
      width: '100%',
      height: '100%',
    },
    checkboxInnerView: {
      height: 20,
      width: 20,
      alignItems: 'center',
      borderRadius: 5,
      borderColor: COLORS.primaryColor,
    },
    checkboxView: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: '5%',
      marginTop: '5%',
    },

    checkboxImg: {
      height: '100%',
      width: '100%',
    },
    checkboxText: {
      ...CustomFonts.body.medium12,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18.9,
      color: COLORS.lightModetextColor,
    },
    secondaryButton: {
      marginBottom: '5%',
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
