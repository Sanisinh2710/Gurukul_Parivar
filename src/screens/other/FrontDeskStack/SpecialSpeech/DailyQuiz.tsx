import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {ScreenHeader, ScreenWrapper} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {View} from 'react-native';

export const DailyQuiz = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const commonstyle = CommonStyle();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Status'}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {},
        }}
      />
      <View
        style={[
          commonstyle.commonContentView,
          {flex: 1, marginTop: 25},
        ]}></View>
    </ScreenWrapper>
  );
};
