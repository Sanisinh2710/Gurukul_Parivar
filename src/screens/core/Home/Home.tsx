import React from 'react';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  BackHandler,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {SliderGetApi, getUserData} from '../../../services';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';
import {COLORS, HomeGrid} from '../../../utils';
import {styles} from './styles';

export const HomeScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [dashboardImages, setDashboardImages] = React.useState([]);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const {t} = useTranslation();

  const style = styles();
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

  const userData = React.useMemo(() => {
    return getUserData();
  }, []);

  const onBackPress = () => {
    Alert.alert(t('common.AppName'), t('common.AppExitMsg'), [
      {
        text: t('common.Yes'),
        onPress: () => {
          BackHandler.exitApp();
        },
      },
      {text: t('common.No'), onPress: () => null},
    ]);
    // Return true to stop default back navigaton
    // Return false to keep default back navigaton
    return true;
  };

  const ExitCallBack = React.useCallback(() => {
    // Add Event Listener for hardwareBackPress
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      // Once the Screen gets blur Remove Event Listener
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  Platform.OS === 'ios' ? null : useFocusEffect(ExitCallBack);

  const handlePress = (val: string) => {
    switch (val) {
      case 'darshan':
        navigation.navigate('dailyDarshan');
        break;
      case 'quotes':
        navigation.navigate('dailyQuotes');
        break;
      case 'update':
        navigation.navigate('dailyUpdates');
        break;
      case 'calendar':
        navigation.navigate('calendar');
        break;
      case 'satsang':
        navigation.navigate('liveSatsang');
        break;
      case 'program':
        navigation.navigate('program');
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
    <ScreenWrapper>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.WelcomeText1}>
                {t('homeScreen.WelcomeText1')}
              </Text>
              <Text style={style.name}>
                {userData.userdata.full_name}
                <Text style={{fontSize: 18, color: COLORS.primaryColor}}>
                  {' '}
                  {userData.userdata.id}
                </Text>
              </Text>
            </View>
            <View>
              <Text style={style.WelcomeText2}>
                {t('homeScreen.WelcomeText2')}
              </Text>
            </View>
          </View>
        }
        headerRight={{
          icon: AllIcons.NotificationOutline,
          onPress: () => {
            navigation.navigate('dailyUpdates');
          },
        }}
      />
      <ScrollView
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
        }}>
        {dashboardImages.length > 0 && (
          <PagerView
            images={dashboardImages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <View style={[commonStyle.commonContentView]}>
          <View style={style.gridContainer}>
            {HomeGrid(t).map((item, index) => (
              <ImageBackground
                key={index}
                imageStyle={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                }}
                borderRadius={12}
                source={item.image}
                style={style.images}>
                <TouchableOpacity
                  style={{height: '100%', width: '100%'}}
                  activeOpacity={0.5}
                  onPress={() => handlePress(item.id)}>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 1)']}
                    locations={[0, 1]}
                    style={{flex: 1, borderRadius: 12}}>
                    <Text style={style.textOverImage}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ImageBackground>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
