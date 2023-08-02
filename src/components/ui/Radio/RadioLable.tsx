import React from 'react';
import {
  DimensionValue,
  Image,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../../utils';
import {genstyle} from './style';

interface Props {
  heading?: string;
  showHeading: boolean;
  value: string;
  onChange: (...event: any[]) => void;
  list: {name: string; icon?: any}[];
  wantFullSpace?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

export const RadioLable = ({
  wantFullSpace,
  customStyle,
  heading,
  list,
  showHeading,
  value,
  onChange,
}: Props) => {
  const style = genstyle();

  const itemWidth: DimensionValue = ('' +
    95 / list.length +
    '%') as DimensionValue;

  return (
    <View>
      {showHeading && <Text style={style.heading}>{heading}</Text>}
      <View style={style.innerView}>
        {list.map(item => (
          <View
            style={[
              style.itemView,
              wantFullSpace && {width: itemWidth},
              value === item.name
                ? {backgroundColor: COLORS.primaryColor}
                : {backgroundColor: COLORS.primaryLightColor},
              !item.icon && {justifyContent: 'center'},
              customStyle,
            ]}
            key={item.name}
            onTouchEnd={() => onChange(item.name)}>
            {item.icon && (
              <Image
                source={item.icon}
                style={[
                  style.icon,
                  value === item.name
                    ? {tintColor: '#FFFFFF'}
                    : {tintColor: COLORS.primaryColor},
                ]}
              />
            )}

            <Text
              style={[
                style.lable,
                value === item.name
                  ? {color: COLORS.white}
                  : {color: COLORS.black},
              ]}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
