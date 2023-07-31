import React from 'react';

import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS} from '../../../utils';
import {ButtonStyles} from './style';

type Props = {
  title: string;
  onPress: any;
  disabled?: boolean;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: {[key: string]: any};
  textStyle?: {[key: string]: any};
};
export const PrimaryButton = React.memo(
  ({
    title,
    onPress,
    buttonColor,
    titleColor,
    buttonStyle,
    textStyle,
    disabled,
  }: Props) => {
    const {theme} = useCustomTheme();

    const styles = ButtonStyles();

    return (
      <View
        onTouchEnd={disabled ? () => {} : onPress}
        style={{
          ...styles.container,
          ...buttonStyle,
        }}>
        {disabled ? (
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.pressableButtonstyle,
              {
                backgroundColor: '#D28F90',
              },
            ]}>
            <Text
              style={{
                ...styles.titleText,
                ...textStyle,
                color: titleColor || COLORS.darkModetextColor,
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        ) : (
          <Pressable
            android_ripple={{
              color: COLORS.primaryRippleColor,
            }}
            style={[
              styles.pressableButtonstyle,
              {
                backgroundColor: buttonColor || theme.primary,
              },
            ]}>
            <Text
              style={{
                ...styles.titleText,
                ...textStyle,
                marginTop: 'auto',
                marginBottom: 'auto',
                color: titleColor || COLORS.darkModetextColor,
              }}>
              {title}
            </Text>
          </Pressable>
        )}
      </View>
    );
  },
);
