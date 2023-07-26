import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {COLORS} from '../../../utils/colors';

type Props = {
  title: string;
  onPress: any;
  buttonColor: string;
  titleColor: string;
  buttonStyle: {[key: string]: any};
  textStyle: {[key: string]: any};
  disabled: boolean;
};

export const CustomButton = React.memo(
  ({
    title,
    onPress,
    buttonColor,
    titleColor,
    buttonStyle,
    textStyle,
    disabled,
  }: Props) => {
    return (
      <Pressable
        disabled={disabled}
        style={{
          opacity: disabled ? 0.7 : 1,

          ...styles.container,
          ...buttonStyle,
          backgroundColor: buttonColor || COLORS.primaryColor,
        }}
        onTouchEnd={onPress}>
        <Text
          style={{
            ...styles.title,
            ...textStyle,
            color: titleColor || '#ffffff',
          }}>
          {title}
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: COLORS.primaryColor,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
});
