import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {DailyUpdatesApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';

export const DailyUpdates = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const {t} = useTranslation();

  const [refreshing, setRefreshing] = React.useState(false);

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
              thumbnail: any;
              title: any;
              created_at: string | number | Date;
              date: any;
            }) => {
              data.description = data.description;
              data.images = data.images;
              data.thumbnail = data.thumbnail;
              data.title = data.title;
              data.date = data.created_at;

              if (
                new Date(data.created_at).toLocaleDateString() ===
                new Date().toLocaleDateString()
              ) {
                let time = new Date(data.created_at)
                  .toLocaleTimeString()
                  .substring(0, 5);

                let day = new Date(data.created_at)
                  .toLocaleTimeString()
                  .substring(8, 12);
                data.created_at = `${time}` + ' ' + `${day}`;
              } else if (
                new Date(data.created_at).getDate() ===
                new Date().getDate() - 1
              ) {
                data.created_at = 'Yesterday';
              } else {
                data.created_at =
                  new Date(data.created_at).getFullYear() ===
                  new Date().getFullYear()
                    ? new Date(data.created_at).toUTCString().slice(5, 11)
                    : new Date(data.created_at).toUTCString().slice(5, 16);
              }

              return data;
            },
          );
          console.log(data,"This is data")
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

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const res = await DailyUpdatesApi();

      if (res.resType === 'SUCCESS') {
        const data = res.data.daily_updates.map(
          (data: {
            description: any;
            images: any;
            thumbnail: any;
            title: any;
            created_at: string | number | Date;
            date: any;
          }) => {
            data.description = data.description;
            data.images = data.images;
            data.thumbnail = data.thumbnail;

            data.title = data.title;
            data.date = data.created_at;
            if (
              new Date(data.created_at).toLocaleDateString() ===
              new Date().toLocaleDateString()
            ) {
              let time = new Date(data.created_at)
                .toLocaleTimeString()
                .substring(0, 5);
              let day = new Date(data.created_at)
                .toLocaleTimeString()
                .substring(8, 12);

              data.created_at = `${time}` + ' ' + `${day}`;
            } else if (
              new Date(data.created_at).getDate() ===
              new Date().getDate() - 1
            ) {
              data.created_at = 'Yesterday';
            } else {
              data.created_at =
                new Date(data.created_at).getFullYear() ===
                new Date().getFullYear()
                  ? new Date(data.created_at).toUTCString().slice(5, 11)
                  : new Date(data.created_at).toUTCString().slice(5, 16);
            }
           
            return data;
          },
        );

        setData(data);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  };
  
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('DailyUpdate.Heading')}
      />
      <View style={commonStyle.commonContentView}>
        {loader ? (
          <Loader screenHeight={'95%'} />
        ) : (
          <>
            {Data.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    colors={[COLORS.primaryColor, COLORS.green]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: '30%',
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
                          style={style.updateView}>
                          <View style={style.imageContainer}>
                            <Image
                              source={AllImages.AppLogo}
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
            ) : (
              <View
                style={{
                  height: '90%',
                }}>
                <NoData />
              </View>
            )}
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};
