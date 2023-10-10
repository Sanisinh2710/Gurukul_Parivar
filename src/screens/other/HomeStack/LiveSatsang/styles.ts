import {COLORS, CustomFonts} from '@utils';
import {StyleSheet} from 'react-native';

export const styles = () => {
  return StyleSheet.create({
    title: {
      ...CustomFonts.header.medium20,
      fontSize: 18,
      color: 'black',
    },
    satsangContainer: {
      marginTop: '3%',
      gap: 10,
    },
    satsangHeading: {
      fontSize: 20,
      color: COLORS.black,
    },
    shimmerTitleStyle: {
      height: 30,
      width: '50%',
      borderRadius: 12,
      marginTop: 10,
    },
    shimmerVideoStyle: {
      height: 200,
      width: '100%',
      borderRadius: 12,
      marginTop: 10,
    },
    videoContainer: {
      marginVertical: '3%',
      gap: 15,
    },
    videoTitleView: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    videoTitle: {
      ...CustomFonts.body.large14,
      fontSize: 18,
      color: COLORS.black,
    },
    videoLoader: {
      position: 'absolute',
      justifyContent: 'center',
      left: 0,
      right: 0,
      flex: 1,
      height: 200,
    },
    noDataView: {width: '100%', height: '90%'},
  });
};
