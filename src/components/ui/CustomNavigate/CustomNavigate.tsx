import React from 'react';
import {Pressable} from 'react-native';
import {Image, Text, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {CustomFonts} from '../../../utils';
import {styles} from './styles';

type CustomNavigateProps = {
  text: string;
  handlePrevPress?: (...event: any[]) => void;
  handleNextPress?: (...event: any[]) => void;
  selectedDate?: Date;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date>>;
};
export const CustomNavigate = ({
  text,
  handlePrevPress,
  handleNextPress,
  selectedDate,
  setSelectedDate,
}: CustomNavigateProps) => {
  const style = styles();
  const commonStyle = CommonStyle();

  return (
    <View style={[commonStyle.commonContentView]}>
      <View style={{justifyContent: 'center'}}>
        <View style={style.navigationContainer}>
          <Pressable onPress={handlePrevPress}>
            <Image
              style={{
                height: 40,
                width: 40,
                transform: [{rotate: '90deg'}],
              }}
              source={AllIcons.RoundedArrow}
            />
          </Pressable>

          <Text
            style={{
              ...CustomFonts.header.small18,
              fontSize: 20,
              color: 'black',
              alignSelf: 'center',
            }}>
            {text}
          </Text>

          <Pressable onPress={handleNextPress}>
            <Image
              style={{
                height: 40,
                width: 40,
                transform: [{rotate: '270deg'}],
              }}
              source={AllIcons.RoundedArrow}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
