import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../hooks';
import {COLORS, CustomFonts} from '../../../utils';

/* ----Memo takes second callback to determine whether previos and new state is same or not..!
 (prev, next) => {
  if (prev.headerRight?.icon === next.headerRight?.icon) {
    return true;
  }
  return false;
},
*/

type ScreenHeaderProps = {
  headerTitle?: string;
  showLeft: boolean;
  headerLeft?: React.JSX.Element;
  customTitle?: React.JSX.Element;
  headerTitleAlign?: 'left' | 'center';
  headerRight?: {
    icon: any;
    onPress: () => void;
  };
  leftOnPress?: () => void;
};

export const ScreenHeader = React.memo(
  ({
    headerTitle,
    showLeft,
    headerLeft,
    customTitle,
    headerTitleAlign,
    headerRight,
    leftOnPress,
  }: ScreenHeaderProps) => {
    const {theme} = useCustomTheme();

    return (
      <View
        style={[
          Platform.OS === 'android'
            ? style(theme).commonHeaderBarAndroid
            : style(theme).commonHeaderBarIOS,
        ]}>
        <View style={[style(theme).commonHeaderBarContent, {width: '100%'}]}>
          <View
            onTouchEnd={leftOnPress ? leftOnPress : () => {}}
            style={{
              width:
                showLeft === false && !headerRight
                  ? '0%'
                  : headerTitleAlign === 'left' && showLeft === false
                  ? '0%'
                  : showLeft === false && headerRight
                  ? '11.5%'
                  : '11.5%',
              height: 40,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {showLeft && !headerLeft && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 60,
                  backgroundColor: COLORS.leftArrowBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcon
                  name="arrow-left"
                  size={25}
                  color={COLORS.black}
                />
              </View>
            )}
            {showLeft && headerLeft && <View>{headerLeft}</View>}
          </View>

          <View
            style={[
              {
                width: showLeft
                  ? '76%'
                  : !headerRight
                  ? '100%'
                  : headerTitleAlign === 'left'
                  ? '88%'
                  : '76%',
                justifyContent:
                  headerTitleAlign === 'center' ? 'center' : 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              },
              headerTitleAlign === 'left' && {
                paddingLeft: 12,
              },
            ]}>
            {headerLeft ? (
              <>
                {headerTitle ? (
                  <Text style={style(theme).commonHeaderText}>
                    {headerTitle}
                  </Text>
                ) : (
                  customTitle
                )}
              </>
            ) : headerTitle ? (
              <Text style={[style(theme).commonHeaderText, {paddingLeft: 0}]}>
                {headerTitle}
              </Text>
            ) : (
              customTitle && customTitle
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '12%',
              alignItems: 'center',
            }}>
            {headerRight && (
              <View
                onTouchEnd={headerRight.onPress}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                  backgroundColor: COLORS.primaryLightColor,
                  height: 40,
                  width: 40,
                }}>
                <Image
                  source={headerRight.icon}
                  style={{height: 24, width: 24}}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  },
);

const style = (theme?: any) =>
  StyleSheet.create({
    commonHeaderBarAndroid: {
      backgroundColor: theme?.headerBarColor,

      //   elevation: 10,
      paddingHorizontal: 20,
      marginTop: '5%',
    },
    commonHeaderBarIOS: {
      backgroundColor: theme?.headerBarColor,
      paddingHorizontal: 20,
      marginTop: '5%',
      //   shadowColor: 'grey',
      //   shadowOffset: {width: 0, height: 2},
      //   shadowOpacity: 0.6,
      //   shadowRadius: 2,
    },
    commonHeaderBarContent: {
      height: Dimensions.get('window').height * 0.07,
      alignItems: 'center',
      flexDirection: 'row',
    },
    commonHeaderText: {
      ...CustomFonts.header.medium20,
      color: COLORS.headingColor,
      fontWeight: '500',
      fontSize: 18,
      paddingLeft: '3%',
    },
    commonBackIconStyle: {
      //   fontSize: 30,
      //   marginLeft: -30,
      //   paddingLeft: 20,
    },
  });
