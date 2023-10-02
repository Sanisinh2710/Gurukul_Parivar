import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { AllIcons } from '../../../../assets/icons';
import { CommonStyle } from '../../../../assets/styles';
import { styles } from './styles';

type CustomNavigateProps = {
  text: string | number;
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
      <View style={{ justifyContent: 'center' }}>
        <View style={style.navigationContainer}>
          <Pressable onPress={handlePrevPress}>
            <Image
              style={[style.leftRightImgStyle, {
                transform: [{ rotate: '90deg' }],
              }]}
              source={AllIcons.RoundedArrow}
            />
          </Pressable>

          <Text
            style={style.textStyle}>
            {text}
          </Text>

          <Pressable onPress={handleNextPress}>
            <Image
              style={[style.leftRightImgStyle, {
                transform: [{ rotate: '270deg' }],
              }]}
              source={AllIcons.RoundedArrow}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
