import React from 'react';
import {Image, ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../utils';

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
    return (
      <View
        onTouchEnd={onPress}
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 60,
            backgroundColor: bgColor || COLORS.primaryLightColor,
            height: 40,
            width: 40,
          },
          containerStyle,
        ]}>
        <Image
          source={icon}
          style={[
            {
              height: 24,
              width: 24,
              resizeMode: 'contain',
            },
            imageStyle,
          ]}
        />
      </View>
    );
  },
);
