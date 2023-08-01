import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader} from '../../../../components';
import {useAppSelector} from '../../../../redux/hooks';
import {styles} from './styles';

export const DailyQuotes = React.memo(() => {
  const theme = useAppSelector(state => state.theme.theme);
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
