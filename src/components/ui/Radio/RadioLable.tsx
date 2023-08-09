import React from 'react';
import {
  Dimensions,
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
  dailyQuiz?: boolean;
}

export const RadioLable = ({
  wantFullSpace,
  customStyle,
  heading,
  list,
  showHeading,
  value,
  onChange,
  dailyQuiz,
}: Props) => {
  const style = genstyle();

  const itemWidth: DimensionValue = ('' +
    95 / list.length +
    '%') as DimensionValue;

  return (
    <View>
      {showHeading && <Text style={style.heading}>{heading}</Text>}
      <View
        style={[
          [
            [
              style.innerView,
              wantFullSpace
                ? {justifyContent: 'space-between'}
                : {gap: 10, flexWrap: 'wrap'},
            ],
          ],
          dailyQuiz && {
            flexWrap: 'wrap',
            width: Dimensions.get('window').width * 0.8,
          },
        ]}>
        {list.map(item => (
          <View
            style={[
              style.itemView,
              value === item.name
                ? {backgroundColor: COLORS.primaryColor}
                : {backgroundColor: COLORS.primaryLightColor},
              !item.icon && {
                justifyContent: 'center',
                alignItems: 'center',
              },
              wantFullSpace && {width: itemWidth},
              customStyle,
            ]}
            key={item.name}
            onTouchEnd={() => onChange(item.name)}>
            {item.icon && (
              <View
                style={[
                  style.icon,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Image
                  source={item.icon}
                  style={[
                    style.icon,
                    {
                      flex: 1,
                      resizeMode: 'contain',
                    },
                    value === item.name
                      ? {tintColor: '#FFFFFF'}
                      : {tintColor: COLORS.primaryColor},
                  ]}
                />
              </View>
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
