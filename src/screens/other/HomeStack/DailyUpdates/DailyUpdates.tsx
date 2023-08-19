import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {Loader, ScreenHeader, ScreenWrapper} from '../../../../components';
import {DailyUpdatesApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {d} from '../../../../utils';
import {styles} from './styles';

export const DailyUpdates = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const NewDate = d.toISOString().split('T')[0];
  const commonStyle = CommonStyle();
  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyUpdatesApi();

      if (res.resType === 'SUCCESS') {
        const timer = setTimeout(() => {
          setData(res.data.daily_updates);
          setLoader(false);
        }, 200);

        return () => {
          clearTimeout(timer);
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // const formatTime = (time: Date) => {
  //   const currentTime = new Date();
  //   const createdAt = new Date(time);

  //   const timeDifference = currentTime - createdAt;

  //   if (timeDifference < 60000) {
  //     return 'Now';
  //   } else if (timeDifference < 3600000) {
  //     return Math.floor(timeDifference / 60000) + ' minutes ago';
  //   } else if (timeDifference < 86400000) {
  //     return Math.floor(timeDifference / 3600000) + ' hours ago';
  //   } else if (timeDifference < 172800000) {
  //     return 'Yesterday';
  //   } else {
  //     const options = {year: 'numeric', month: 'short', day: 'numeric'};
  //     return createdAt.toLocaleDateString(undefined, options);
  //   }
  // };

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
        {loader ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: '35%',
            }}
            data={Data}
            renderItem={({item, index}) => {
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
                        <Image source={AllImages.AppLogo} style={style.image} />
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
        )}
      </View>
    </ScreenWrapper>
  );
};
