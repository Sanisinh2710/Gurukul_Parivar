import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';

export const ModalStyle = (modalHeight: any) => {
  return StyleSheet.create({
    formTextInput: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '400',
      width: '100%',
      color: COLORS.lightModetextColor,
      opacity: 1,
    },
    modelWholeView: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modelMainView: {
      position: 'absolute',
      width: '100%',
      height: modalHeight,
      bottom: 0,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    modelCloserMainView: {height: 40},
    modelCloserView: {
      width: 50,
      height: 5,
      backgroundColor: 'rgba(223, 223, 223, 1)',
      alignSelf: 'center',
      top: 10,
    },
    modelLabelText: {
      ...CustomFonts.body.large14,
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.lightModetextColor,
    },
    modelValueResetText: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      fontWeight: '500',
      color: COLORS.lightModetextColor,
      opacity: 0.5,
    },
    modelInnerView: {
      elevation: 5,
      // marginTop: 20,
      // paddingHorizontal: 30,
    },
    modelSearchView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E6E6E6',
      borderRadius: 10,
      height: 50,
      marginTop: 12,
      paddingHorizontal: 15,
    },
    modelFlatListContainerStyle: {
      paddingTop: 30,
      paddingBottom: '40%',
      gap: 25,
    },
    modelMenuView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.10)',
    },
    modelMenuText: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: COLORS.lightModetextColor,
      paddingBottom: 10,
    },
  });
};
