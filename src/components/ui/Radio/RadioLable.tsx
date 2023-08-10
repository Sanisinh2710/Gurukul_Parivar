import React from 'react';
import {Dimensions, DimensionValue, Image, Text, View} from 'react-native';
import {COLORS} from '../../../utils';
import {genstyle} from './style';

interface Props {
  wantFullSpace: boolean;
  customStyle: {[key: string]: any};
  selectedItem: string;
  setselectedItem: React.Dispatch<React.SetStateAction<string>>;
  heading: string;
  list: {name: string; icon?: any}[];
  dailyQuiz?: boolean;
}

export const RadioLable = ({
  wantFullSpace,
  customStyle,
  heading,
  list,
  selectedItem,
  setselectedItem,
  dailyQuiz,
}: Props) => {
  const style = genstyle();

  const itemWidth: DimensionValue = ('' +
    95 / list.length +
    '%') as DimensionValue;

  return (
    <View>
      <Text style={style.heading}>{heading}</Text>
      <View
        style={[
          style.innerView,
          dailyQuiz && {
            flexWrap: 'wrap',
            width: Dimensions.get('window').width * 0.8,
          },
        ]}>
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
