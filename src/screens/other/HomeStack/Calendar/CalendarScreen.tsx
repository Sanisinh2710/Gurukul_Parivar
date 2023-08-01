import React from 'react';
import {Text, View} from 'react-native';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {styles} from './styles';

export const CalendarScreen = React.memo(() => {
  const style = styles();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <Text style={style.title}>My Profile</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
});
