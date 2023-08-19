import React from 'react';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AllIcons} from '../../../../assets/icons';
import {AllImages} from '../../../../assets/images';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {getUserData} from '../../../services';
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
  const [dashboardImages, setDashboardImages] = React.useState([
    AllImages.Rectangle,
    AllImages.Rectangle3,
    AllImages.Rectangle2,
  ]);

  const style = styles();
  const TouchX = React.useRef<any>();

  const userData = React.useMemo(() => {
    return getUserData();
  }, []);

  const {t} = useTranslation();
  const commonStyle = CommonStyle();

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
          icon: AllIcons.Notification,
          onPress: () => {},
        }}
      />

      <View style={[commonStyle.commonContentView, {height: '100%'}]}>
        <View
          onTouchStart={e => {
            TouchX.current = e.nativeEvent.pageX;
          }}
          onTouchEnd={e => {
            if (TouchX.current - e.nativeEvent.pageX > 20) {
              if (currentPage < dashboardImages.length - 1) {
                setCurrentPage(currentPage + 1);
              }
            }
            if (TouchX.current - e.nativeEvent.pageX < -20) {
              if (
                currentPage > 0 &&
                currentPage <= dashboardImages.length - 1
              ) {
                setCurrentPage(currentPage - 1);
              }
            }
          }}>
          <PagerView currentPage={currentPage} images={dashboardImages} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '50%',
          }}>
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
                    colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 0.5)']}
                    locations={[0, 1]}
                    style={{flex: 1, borderRadius: 12}}>
                    <Text style={style.textOverImage}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ImageBackground>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
