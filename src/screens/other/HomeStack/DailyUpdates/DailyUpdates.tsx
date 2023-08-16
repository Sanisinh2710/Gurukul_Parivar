import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {d} from '../../../../utils';
import {styles} from './styles';
import {DailyUpdatesApi} from '../../../../services';

export const DailyUpdates = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [Data, setData] = React.useState<Array<String>>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const NewDate = d.toISOString().split('T')[0];

  const commonStyle = CommonStyle();
  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyUpdatesApi();

      if (res.resType === 'SUCCESS') {
        setTimeout(() => {
          setData(res.data.daily_updates);
          setLoader(false);
        }, 200);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Daily Update'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {},
        }}
      />
      <View style={commonStyle.commonContentView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '35%',
          }}
          data={Data}
          renderItem={({item, index}) => {
            console.log(index);
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('dailyUpdateDetail', {
                    title: item.title,
                    data: Data[index],
                  });
                }}>
                <View style={style.updateContainer}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20%',
                    }}>
                    <View style={style.imageContainer}>
                      <Image
                        source={{
                          uri: `https://gurukul.taskgrids.com/${item.images}`,
                        }}
                        style={style.image}
                      />
                    </View>
                  </View>
                  <View style={{width: '80%'}}>
                    <View style={style.textContainer}>
                      <Text style={style.title}>{item.title}</Text>
                      <Text style={style.time}>{item.created_at}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
