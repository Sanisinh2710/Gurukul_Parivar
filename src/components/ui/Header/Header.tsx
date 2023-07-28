import React from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../hooks';
import {Theme} from '../../../types';
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
              width: showLeft === false && !headerRight ? '0%' : '11.5%',
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
                width: showLeft ? '76%' : !headerRight ? '100%' : '76%',
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
                  justifyContent: 'flex-end',
                }}>
                <MaterialCommunityIcon
                  name={headerRight.icon}
                  size={25}
                  color={theme.textColor}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  },
);

const style = (theme?: Theme) => {
  return StyleSheet.create({
    commonHeaderBarAndroid: {
      backgroundColor: theme?.headerBarBackground,
      paddingHorizontal: 20,
      marginTop: '5%',
    },
    commonHeaderBarIOS: {
      backgroundColor: theme?.headerBarBackground,
      paddingHorizontal: 20,
      marginTop: '5%',
    },
    commonHeaderBarContent: {
      height: Dimensions.get('window').height * 0.07,
      alignItems: 'center',
      flexDirection: 'row',
    },
    commonHeaderText: {
      ...CustomFonts.header.medium20,
      color: theme?.textColor,
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
};
