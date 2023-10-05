import React from 'react';

import {AllImages, CommonStyle} from '@assets';
import {PrimaryButton, ScreenWrapper} from '@components';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootBottomTabParamList, RootStackParamList} from '@types';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';

export const CommingSoon = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<RootBottomTabParamList>,
  NativeStackScreenProps<RootStackParamList>
>): React.JSX.Element => {
  const style = styles();
  const CommonStyles = CommonStyle();

  return (
    <ScreenWrapper>
      <View
        style={[
          CommonStyles.commonContentView,
          style.mainWrapperStyle,
        ]}>
        <View>
          <View>
            <Image
              source={AllImages.CommingSoon}
              style={style.commingSoonImgstyle}
            />
          </View>
          <View>
            <Text style={style.soon}>Coming Soon...</Text>
            <Text style={style.NoDataContent}>
              Looks like our data elves are on a break.
            </Text>
            <Text style={style.NoDataContent}>
              We'll conjure up some information soon.
            </Text>
          </View>
        </View>

        <PrimaryButton
          title={'Go to Home Page'}
          onPress={() => navigation.goBack()}
          buttonStyle={style.primaryButtonStyle}
        />
      </View>
    </ScreenWrapper>
  );
};
