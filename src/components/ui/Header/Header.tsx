import React from 'react';

import {AllIcons} from '@assets';
import {RoundedIcon} from '@components';
import {useAppSelector} from '@redux/hooks';
import {Theme} from '@types';
import {COLORS, CustomFonts} from '@utils';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    const theme = useAppSelector(state => state.theme.theme);

    return (
      <View
        style={[
          Platform.OS === 'android'
            ? style(theme).commonHeaderBarAndroid
            : style(theme).commonHeaderBarIOS,
        ]}>
        <View style={[style(theme).commonHeaderBarContent, { width: '100%' }]}>
          <View
            onTouchEnd={leftOnPress ? leftOnPress : () => { }}
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
                style={style(theme).headerLeftView}>
                <View
                  style={style(theme).headerLeftImgView}>
                  <Image
                    source={AllIcons.ArrowSimpleLeft}
                    style={style(theme).headerLeftImg}
                  />
                </View>
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
              <Text style={[style(theme).commonHeaderText, { paddingLeft: 0 }]}>
                {headerTitle}
              </Text>
            ) : (
              customTitle && customTitle
            )}
          </View>

          <View
            style={style(theme).headerRightImgView}>
            {headerRight && (
              <RoundedIcon
                icon={headerRight.icon}
                onPress={headerRight.onPress}
              />
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
      paddingHorizontal: 20,
      marginTop: '5%',
    },
    commonHeaderBarIOS: {
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
    headerLeftView: {
      width: '100%',
      height: '100%',
      borderRadius: 60,
      backgroundColor: COLORS.leftArrowBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLeftImgView: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLeftImg: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    headerRightImgView: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '12%',
      alignItems: 'center',
    }
  });
};
