import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {
  Loader,
  PagerView,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {SliderGetApi} from '../../../services';
import {RootStackParamList} from '../../../types';
import {COLORS, FrontDesk} from '../../../utils';
import {styles} from './styles';

export const FrontDeskScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [dashboardImages, setDashboardImages] = React.useState([]);

  const [loader, setLoader] = React.useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const style = styles();

  const {t} = useTranslation();
  const commonStyle = CommonStyle();

  React.useMemo(async () => {
    setLoader(true);

    try {
      const res = await SliderGetApi();

      if (res.resType === 'SUCCESS') {
        setDashboardImages(res.data.images);

        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePress = (val: string) => {
    switch (val) {
      // case 'goform':
      //   navigation.navigate('dailyDarshan');
      //   break;
      case 'connect':
        navigation.navigate('GurukulConnect');
        break;
      case 'quiz':
        navigation.navigate('dailyQuiz');
        break;
      // case 'donation':
      //   navigation.navigate('donation');
      //   break;
      case 'event':
        navigation.navigate('GurukulEvents');
        break;
      default:
        break;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const res = await SliderGetApi();

      if (res.resType === 'SUCCESS') {
        setDashboardImages(res.data.images);
      }
    } catch (error) {
      console.log(error);
    }

    setRefreshing(false);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ScreenWrapper>
          <ScreenHeader
            showLeft={false}
            headerTitleAlign={'left'}
            customTitle={
              <View>
                <Text style={style.title}>{t('frontDesk.Heading')}</Text>
              </View>
            }
            headerRight={{
              icon: AllIcons.NotificationOutline,
              onPress: () => navigation.navigate('dailyUpdates'),
            }}
          />
          <ScrollView
            overScrollMode="always"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.contentContainerStyle}
            refreshControl={
              <RefreshControl
                colors={[COLORS.primaryColor, COLORS.green]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            <View style={style.dashboardImagesContainer}>
              <PagerView images={dashboardImages} />
            </View>
            <View style={style.container}>
              <FlatList
                overScrollMode="always"
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  style.flatlistContainer,
                  commonStyle.commonContentView,
                ]}
                data={FrontDesk(t)}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        handlePress(item.id);
                      }}>
                      <View style={style.flatListContainer}>
                        <View
                          style={[
                            style.imageContainer,
                            {backgroundColor: item.imageBG},
                          ]}>
                          <Image source={item.image} style={style.image} />
                        </View>
                        <View style={style.titleWrapper}>
                          <Text style={style.listTitle}>{item.title} </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </ScreenWrapper>
      )}
    </>
  );
};
