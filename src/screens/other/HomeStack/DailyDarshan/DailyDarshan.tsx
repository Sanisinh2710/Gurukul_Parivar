import React from 'react';
import {Image, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {RadioLable, ScreenHeader, ScreenWrapper} from '../../../../components';
import {CustomFonts} from '../../../../utils';
import {AllIcons} from '../../../../../assets/icons';

export const DailyDarshan = () => {
  const commonStyle = CommonStyle();
  const [selectedItem, setselectedItem] = React.useState('');

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        headerTitle={'Daily Darshan'}
        headerRight={{
          icon: AllIcons.Calendar,
          onPress: () => {
            console.log('Notification recieved');
          },
        }}
      />
      <View style={commonStyle.commonContentView}>
        <RadioLable
          wantFullSpace={false}
          customStyle={{
            borderRadius: 60,
            height: 40,
            borderWidth: 0,
          }}
          selectedItem={selectedItem}
          setselectedItem={setselectedItem}
          heading={''}
          list={[{name: 'All'}, {name: 'Morning'}, {name: 'Evening'}]}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{height: 40, width: 40}}
            source={AllIcons.RoundedArrow}
          />
          <Text
            style={{
              ...CustomFonts.header.small18,
              fontSize: 20,
              color: 'black',
            }}>
            l
          </Text>
          <Image
            style={{height: 40, width: 40}}
            source={AllIcons.RoundedArrow}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
