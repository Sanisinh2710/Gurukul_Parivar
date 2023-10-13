import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {ScreenHeader, ScreenWrapper} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {FrontDesk} from '@utils';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
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

  // React.useMemo(async () => {
  //   setLoader(true);

  //   try {
  //     const res = await SliderGetApi();

  //     if (res.resType === 'SUCCESS') {
  //       setDashboardImages(res.data.images);

  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const handlePress = (val: string) => {
    switch (val) {
      // case 'goform':
      //   navigation.navigate('dailyDarshan');
      //   break;
      case 'connect':
        navigation.navigate('GurukulConnect');
        break;
      case 'quiz':
        navigation.navigate('dailyQuizDetail');
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

  // const onRefresh = async () => {
  //   setRefreshing(true);

  //   try {
  //     const res = await SliderGetApi();

  //     if (res.resType === 'SUCCESS') {
  //       setDashboardImages(res.data.images);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setRefreshing(false);
  // };

  return (
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
        contentContainerStyle={{
          paddingBottom: '30%',
        }}>
        <View style={[{flex: 1}]}>
          <View style={style.boxView}>
            {FrontDesk(t).map((item, index) => (
              <View key={index} style={style.boxViewInnerView}>
                <View
                  onTouchEnd={() => handlePress(item.id)}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}>
                  <View style={[style.imageContainer]}>
                    <Image
                      source={item.image}
                      style={{height: 34, width: 34}}
                    />
                  </View>
                  <Text numberOfLines={2} style={style.listTitle}>
                    {item.title}{' '}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
