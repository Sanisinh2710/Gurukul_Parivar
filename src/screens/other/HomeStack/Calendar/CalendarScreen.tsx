import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView, View, Image} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader} from '../../../../components';
import {useCustomTheme} from '../../../../hooks';
import {styles} from './styles';

export const CalendarScreen = React.memo(() => {
  const {theme} = useCustomTheme();
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
        // headerRight={{
        //   icon: require('../../../../assets/icons/Notification.png'),
        //   onPress: () => {
        //     console.log('Notification recieved');
        //   },
        // }}
      />
    </SafeAreaView>
  );
});
