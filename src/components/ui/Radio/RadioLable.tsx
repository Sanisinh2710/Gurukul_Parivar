import {DimensionValue, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS, CustomFonts} from '../../../utils';
import {Image} from 'react-native';
import React from 'react';
import {genstyle} from './style';
import {StyleProp} from 'react-native';

interface Props {
  wantFullSpace: boolean;
  customStyle: {[key: string]: any};
  selectedItem: string;
  setselectedItem: React.Dispatch<React.SetStateAction<string>>;
  heading: string;
  list: {name: string; icon?: any}[];
}

export const RadioLable = ({
  wantFullSpace,
  customStyle,
  heading,
  list,
  selectedItem,
  setselectedItem,
}: Props) => {
  const style = genstyle();

  const itemWidth: DimensionValue = ('' +
    95 / list.length +
    '%') as DimensionValue;

  return (
    <View>
      <Text style={style.heading}>{heading}</Text>
      <View style={style.innerView}>
        {list.map(item => (
          <View
            style={[
              style.itemView,
              wantFullSpace && {width: itemWidth},
              selectedItem === item.name
                ? {backgroundColor: COLORS.primaryColor}
                : {backgroundColor: COLORS.primaryLightColor},
              !item.icon && {justifyContent: 'center'},
              {...customStyle},
            ]}
            key={item.name}
            onTouchEnd={() => setselectedItem(item.name)}>
            {item.icon && (
              <Image
                source={item.icon}
                style={[
                  style.icon,
                  selectedItem === item.name
                    ? {tintColor: '#FFFFFF'}
                    : {tintColor: COLORS.primaryColor},
                ]}
              />
            )}

            <Text
              style={[
                style.lable,
                selectedItem === item.name
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
