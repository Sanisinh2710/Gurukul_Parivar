import React from 'react';

import {SafeAreaView, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader} from '../../../../components';
import {styles} from './styles';

export const DailyUpdates = () => {
  const style = styles();
  const commonStyle = CommonStyle();

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <Text style={style.title}>My Profile</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
