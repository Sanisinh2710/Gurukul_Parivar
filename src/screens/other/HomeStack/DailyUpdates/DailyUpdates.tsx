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
          const data = res.data.daily_updates.map(
            (data: {
              description: any;
              images: any;
              title: any;
              created_at: string | number | Date;
            }) => {
              data.description = data.description;
              data.images = data.images;
              data.title = data.title;

              if (
                new Date(data.created_at).toLocaleDateString() ===
                new Date().toLocaleDateString()
              ) {
                let time = new Date(data.created_at)
                  .toLocaleTimeString()
                  .substring(0, 5);
                let day = new Date(data.created_at)
                  .toLocaleTimeString()
                  .substring(9, 12);

                data.created_at = `${time}` + ' ' + `${day}`;
              } else if (
                new Date(data.created_at).getDate() ===
                new Date().getDate() - 1
              ) {
                data.created_at = 'Yesterday';
              } else {
                data.created_at = new Date(data.created_at)
                  .toUTCString()
                  .slice(5, 11)
                  .concat(',');
              }

              return data;
            },
          );

          setData(data);
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

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Daily Update'}
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
