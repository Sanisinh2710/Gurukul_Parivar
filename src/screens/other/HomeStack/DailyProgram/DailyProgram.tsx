import React from 'react';

import {CommonStyle} from '@assets';
import {Loader, NoData, ScreenHeader, ScreenWrapper} from '@components';
import {BASE_URL} from '@env';
import {DailyProgramGetApi} from '@services';
import {DailyProgramProps} from '@types';
import {COLORS} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {styles} from './style';

export const DailyProgram = ({
  navigation,
}: DailyProgramProps): React.JSX.Element => {
  const {t} = useTranslation();

  const commonStyle = CommonStyle();
  const style = styles();
  const [loader, setLoader] = React.useState<boolean>(false);

  const [DailyProgramData, setDailyProgramData] = React.useState<
    {
      title: string;
      description: string;
      image: string;
    }[]
  >([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const getAndSetDailyPrograms = async () => {
    try {
      const res = await DailyProgramGetApi();

      if (res.resType === 'SUCCESS') {
        setDailyProgramData(res.data.daily_programs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useMemo(async () => {
    setLoader(true);
    await getAndSetDailyPrograms();
    setLoader(false);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAndSetDailyPrograms();
    setRefreshing(false);
  };

  const navigateScreen = (item: any) => {
    navigation.navigate('programDetail', {
      title: item.title,
      description: item.description,
    });
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('homeScreen.DailyProgram')}
      />
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        {loader ? (
          <Loader />
        ) : DailyProgramData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.flatListContentStyle}
            refreshControl={
              <RefreshControl
                colors={[COLORS.primaryColor, COLORS.green]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={DailyProgramData}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => navigateScreen(item)}
                  android_ripple={{
                    color: COLORS.primaryRippleColor,
                    foreground: true,
                  }}
                  key={item.title + index}
                  style={style.listContainer}>
                  <View style={style.listContentView}>
                    <View style={style.listImageView}>
                      <Image
                        source={{uri: `${BASE_URL}${item.image}`}}
                        style={style.imageStyle}
                      />
                    </View>
                    <Text style={style.listTextStyle} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <View
            style={{
              height: Dimensions.get('window').height * 0.8,
            }}>
            <NoData />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};
