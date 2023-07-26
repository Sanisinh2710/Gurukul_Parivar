import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {CustomFonts} from '../../../utils/fonts';
import {COLORS} from '../../../utils/colors';

type ScreenHeaderProps = {
  theme: any;
  headerTitle?: string;
  showLeft: boolean;
  headerLeft?: React.JSX.Element;
  customTitle?: React.JSX.Element;
  headerTitleAlign?: 'left' | 'center';
  headerRight?: {
    icon: any;
    onPress: () => void;
  }[];
  leftOnPress?: () => void;
};

export const ScreenHeader = ({
  theme,
  headerTitle,
  showLeft,
  headerLeft,
  customTitle,
  headerTitleAlign,
  headerRight,
  leftOnPress,
}: ScreenHeaderProps) => {
  return (
    <View
      style={[
        Platform.OS === 'android'
          ? style(theme).commonHeaderBarAndroid
          : style(theme).commonHeaderBarIOS,
      ]}>
      <View style={[style(theme).commonHeaderBarContent, {width: '100%'}]}>
        {showLeft !== false && !headerLeft && (
          <View
            onTouchEnd={leftOnPress ? leftOnPress : () => {}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 60,
              backgroundColor: COLORS.leftArrowBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="arrow-left" size={25} color={COLORS.black} />
          </View>
        )}

        {showLeft !== false && headerLeft && (
          <View onTouchEnd={leftOnPress ? leftOnPress : () => {}}>
            {headerLeft}
          </View>
        )}

        {headerTitleAlign === 'center' ? (
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {headerTitle ? (
              <Text
                style={[style(theme).commonHeaderText, {textAlign: 'center'}]}>
                {headerTitle}
              </Text>
            ) : (
              customTitle
            )}
          </View>
        ) : headerLeft ? (
          <>
            {headerTitle ? (
              <Text style={style(theme).commonHeaderText}>{headerTitle}</Text>
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

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '10%',
            alignItems: 'center',
          }}>
          {headerRight && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              {headerRight.map((icons, index) => {
                return (
                  <></>
                  // <RoundedIcon
                  //   key={index}
                  //   theme={theme}
                  //   icon={icons.icon}
                  //   onPress={icons.onPress}
                  // />
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

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
