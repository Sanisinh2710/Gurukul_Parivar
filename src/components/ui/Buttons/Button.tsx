import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../utils/colors';

type Props = {
  title: string;
  onPress: any;
  buttonColor: string;
  titleColor: string;
  buttonStyle: {[key: string]: any};
  textStyle: {[key: string]: any};
};

const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}: Props) => {
  return (
    <View
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#FF521C',
      }}
      onTouchEnd={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || 'white'}}>
        {title}
      </Text>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLORS.primaryColor,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Satoshi-Regular',
  },
});
