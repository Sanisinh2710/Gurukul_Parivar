import {StyleSheet} from 'react-native';
import {COLORS, CustomFonts} from '../../../../utils';

export const styles = () => {
  return StyleSheet.create({
    flatListContentStyle: {
      gap: 15,
      marginTop: '10%',
    },
    listContainer: {
      height: 65,
      borderRadius: 8,
      borderWidth: 0.4,
      borderColor: COLORS.primaryColor,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      overflow: 'hidden',
    },
    listContentView: {
      flexDirection: 'row',
      height: '100%',
      alignItems: 'center',
      gap: 20,
    },
    listImageView: {
      width: 40,
      height: 40,
      padding: 8,
      borderRadius: 6,
    },
    imageStyle: {
      height: 40,
      width: 40,
      flex: 1,
      resizeMode: 'contain',
    },
    listTextStyle: {
      ...CustomFonts.header.medium20,
      color: COLORS.lightModetextColor,
      fontSize: 16,
    },
  });
};
