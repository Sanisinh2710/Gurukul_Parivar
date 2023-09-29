import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';

export const PersonalInfoStyle = () => {
  const theme = useAppSelector(state => state.theme.theme);
  return StyleSheet.create({
    mainScrollviewContainer: {
      paddingBottom: '30%',
      flexGrow: 1,
    },
    emailFieldMainView: {gap: 15, marginTop: '5%'},
    removeImgView: {height: 30, width: 30, alignSelf: 'flex-end'},
    removeImgStyle: {
      width: '100%',
      height: '100%',
    },
    bottomBtnView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '5%',
    },
    commonBtnStyle: {
      width: '47%',
    },
  });
};
