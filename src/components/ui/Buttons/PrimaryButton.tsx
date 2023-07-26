import React from 'react';

import {Pressable, Text, View} from 'react-native';
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
        <Pressable
          android_ripple={{
            color: COLORS.primaryRippleColor,
          }}
          style={[
            styles.pressableButtonstyle,
            {
              backgroundColor: disabled
                ? '#D28F90'
                : buttonColor || theme.primary,
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
  },
);
