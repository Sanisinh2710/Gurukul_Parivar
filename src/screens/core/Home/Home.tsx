import React from 'react';

import {AllIcons, AllImages, CommonStyle} from '@assets';
import {
  DropDownModel,
  PagerView,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppSelector} from '@redux/hooks';
import {SliderGetApi} from '@services';
import {RootBottomTabParamList, RootStackParamList} from '@types';
import {COLORS, HomeGrid} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  BackHandler,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

export const HomeScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const [loader, setLoader] = React.useState<boolean>(false);

  const [exitModel, setExitModel] = React.useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const {t} = useTranslation();

  const style = styles();
  const commonStyle = CommonStyle();

  const [dashboardImages, setDashboardImages] = React.useState([]);

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

  const userData = useAppSelector(state => state.currUser.currUser);

  const onBackPress = () => {
    // Alert.alert(t('common.AppName'), t('common.AppExitMsg'), [
    //   {
    //     text: t('common.Yes'),
    //     onPress: () => {
    //       BackHandler.exitApp();
    //     },
    //   },
    //   {text: t('common.No'), onPress: () => null},
    // ]);
    // // Return true to stop default back navigaton
    // // Return false to keep default back navigaton
    setExitModel(true);

    return true;
  };

  const ExitCallBack = React.useCallback(() => {
    // Add Event Listener for hardwareBackPress
    Platform.OS === 'android'
      ? BackHandler.addEventListener('hardwareBackPress', onBackPress)
      : navigation.addListener('beforeRemove', onBackPress);

    return () => {
      // Once the Screen gets blur Remove Event Listener

      Platform.OS === 'android'
        ? BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        : navigation.removeListener('beforeRemove', onBackPress);
    };
  }, [onBackPress]);

  useFocusEffect(ExitCallBack);

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

  const ExitModelJSX = React.useMemo(() => {
    return (
      <View
        style={style.exitModelView}
        onTouchEnd={e => {
          e.stopPropagation();
        }}>
        <View style={style.exitModelLogo}>
          <Image
            source={AllImages.AppLogo}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={[
              style.exitText,
              {
                color: COLORS.black,
                fontSize: 20,
              },
            ]}>
            {t('common.AppName')}
          </Text>
          <Text style={style.exitText}>{t('common.AppExitMsg')}</Text>
        </View>
        <View style={style.submitButtonView}>
          <PrimaryButton
            title={t('common.No')}
            buttonStyle={style.submitButtonStyle}
            onPress={() => {
              setExitModel(false);
            }}
          />
          <PrimaryButton
            title={t('common.Yes')}
            buttonStyle={style.submitButtonStyle}
            onPress={() => {
              setExitModel(false);
              if (Platform.OS === 'android') BackHandler.exitApp();
            }}
            buttonColor="#2f9635"
          />
        </View>
      </View>
    );
  }, [BackHandler, t, style]);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <View style={style.WelcomeTextContainer}>
              <Text style={style.WelcomeText1}>
                {t('homeScreen.WelcomeText1')}
              </Text>
              <Text style={style.name}>
                {userData?.full_name?.split(' ')?.at(0)}
                <Text style={style.id}> {userData?.id}</Text>
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
        overScrollMode="always"
        refreshControl={
          <RefreshControl
            colors={[COLORS.primaryColor, COLORS.green]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.contentContainerStyle}>
        {dashboardImages.length > 0 && <PagerView images={dashboardImages} />}
        <View style={[commonStyle.commonContentView]}>
          <View style={style.gridContainer}>
            {HomeGrid(t).map((item, index) => (
              <ImageBackground
                key={index}
                imageStyle={style.imageBgStyle}
                borderRadius={12}
                source={item.image}
                style={style.images}>
                <TouchableOpacity
                  style={style.linearGradientView}
                  activeOpacity={0.5}
                  onPress={() => handlePress(item.id)}>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 1)']}
                    locations={[0, 1]}
                    style={style.linearGradientStyle}>
                    <Text style={style.textOverImage}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ImageBackground>
            ))}
          </View>
        </View>
        <DropDownModel
          viewPhoto={true}
          modelVisible={exitModel}
          setModelVisible={setExitModel}
          customModelchild={ExitModelJSX}
          type={'simple'}
          modalHeight={'40%'}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};
