import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../redux/hooks';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return StyleSheet.create({
    WelcomeText1: {
      ...CustomFonts.body.large14,
      fontSize: 24,
      color: 'black',
    },
    progressText: {
      ...CustomFonts.header.large36,
      fontSize: 24,
      color: 'black',
    },
    linearGradient: {
      marginTop: '10%',
      flex: 1,
      height: 40,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
    },
    leftQueBar: {
      width: '5%',
      borderLeftWidth: 7,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
      borderColor: COLORS.primaryColor,
    },
    leftQueBarContainer: {flexDirection: 'row', height: '100%'},
    QueContainer: {width: '95%', justifyContent: 'center'},
    Que: {
      ...CustomFonts.header.small18,
      color: 'black',
      fontSize: 14,
    },
    mapWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    option: {
      width: '40%',
      marginRight: '5%',
      marginVertical: '3%',
      padding: 10,
      borderRadius: 20,
    },
    btnWrapper: {paddingBottom: '5%', marginTop: '5%'},
  });
};
