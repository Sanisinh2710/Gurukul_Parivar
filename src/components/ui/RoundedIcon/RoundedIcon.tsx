import React from 'react';

import {COLORS} from '@utils';
import {Image, ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import { styles } from './style';

type RoundedIconProps = {
  icon: any;
  onPress: (...event: any[]) => void;
  bgColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

export const RoundedIcon = React.memo(
  ({
    icon,
    onPress,
    containerStyle,
    imageStyle,
    bgColor,
  }: RoundedIconProps): React.JSX.Element => {
    const style = styles();
    return (
      <View
        onTouchEnd={onPress}
        style={[
          style.container,
          {
            backgroundColor: bgColor || COLORS.primaryLightColor,
          },
          containerStyle,
        ]}>
        <Image
          source={icon}
          style={[
            style.roundIconImg,
            imageStyle,
          ]}
        />
      </View>
    );
  },
);
