import React from 'react';

import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS} from '../../../utils';
import {ButtonStyles} from './style';

type Props = {
  title: string;
  onPress: any;
  borderColor?: string;
  disabled?: boolean;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: {[key: string]: any};
  textStyle?: {[key: string]: any};
};
export const SecondaryButton = React.memo(
  ({
    title,
    borderColor,
    onPress,
    buttonColor,
    titleColor,
    buttonStyle,
    textStyle,
    disabled,
  }: Props) => {
    const theme = useAppSelector(state => state.theme.theme);

    const styles = ButtonStyles();

    return (
      <View
        onTouchEnd={disabled ? () => {} : onPress}
        style={[
          {
            ...styles.container,
            ...buttonStyle,
          },
          {
            backgroundColor: buttonColor || COLORS.lightsunray,
            borderColor: borderColor || COLORS.sunray,
          },
        ]}>
        {disabled ? (
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.pressableButtonstyle,
              {
                backgroundColor: buttonColor || COLORS.lightsunray,
                borderColor: borderColor || COLORS.sunray,
                // ...buttonStyle,
              },
            ]}>
            <Text
              style={{
                ...styles.titleText,
                ...textStyle,
                color: titleColor || COLORS.lightsunray,
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
                backgroundColor: buttonColor || COLORS.lightsunray,
                borderWidth: 1,
                borderColor: borderColor || COLORS.sunray,
              },
            ]}>
            <Text
              style={{
                ...styles.titleText,
                ...textStyle,
                color: titleColor || COLORS.sunray,
              }}>
              {title}
            </Text>
          </Pressable>
        )}
      </View>
    );
  },
);
