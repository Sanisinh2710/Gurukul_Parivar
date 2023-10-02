import {StyleSheet} from 'react-native';
import {CustomFonts} from '../../../utils';

export const styles = () => {
  return StyleSheet.create({
    noDataWrapper: {flex: 1, justifyContent: 'center'},
    NoDataTitle: {
      ...CustomFonts.header.medium20,
      fontSize: 20,
      color: 'black',
      lineHeight: 27,
    },
    NoDataContent: {
      ...CustomFonts.body.large14,
      fontSize: 16,
      color: 'rgba(23,23,23,0.5)',
      lineHeight: 25,
      textAlign: 'center',
    },
    noDataImgView: {
      width: '70%',
      height: '40%',
      alignSelf: 'center',
    },
    noDataImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
};
