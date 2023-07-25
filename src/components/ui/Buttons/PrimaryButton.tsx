import React from 'react';

import {Pressable, Text, View} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS} from '../../../utils';
import {ButtonStyles} from './style';

type Props = {
  title: string;
  onPress: any;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: {[key: string]: any};
  textStyle?: {[key: string]: any};
};
export const PrimaryButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}: Props) => {
  const {theme} = useCustomTheme();

  const styles = ButtonStyles();

  return (
    <View
      onTouchEnd={onPress}
      style={{
        ...styles.container,
      }}>
      <Pressable
        android_ripple={{
          color: COLORS.primaryRippleColor,
        }}
        style={[
          styles.pressableButtonstyle,
          {
            ...buttonStyle,
            backgroundColor: buttonColor || theme.primary,
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
      </Pressable>
    </View>
  );
};
