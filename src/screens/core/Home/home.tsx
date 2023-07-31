import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../assets/styles';
import {ScreenHeader} from '../../../components';
import {PagerView} from '../../../components/ui/Carousel/pagerView';
import {useCustomTheme} from '../../../hooks';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {HomeGrid} from '../../../utils';
import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PrimaryStack1ScreenProps} from '../../../types';
export const HomeScreen = ({navigation}: any) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const style = styles();
  const TouchX = React.useRef<any>();
  const {theme} = useCustomTheme();
  const {t, i18n} = useTranslation();
  const commonStyle = CommonStyle();
  function handlePress(val: any) {
    console.log(val);

    switch (val) {
      case 'Daily Darshan':
        navigation.navigate('dailyDarshan');
        break;
      case 'Daily Quotes':
        navigation.navigate('dailyQuotes');
        break;
      case 'Daily Update':
        navigation.navigate('dailyUpdates');
        break;
      case 'Calendar':
        navigation.navigate('calendar');
        break;

      default:
        break;
    }
  }
  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.WelcomeText1}>
                {t('HomeScreen:WelcomeText1')}{' '}
              </Text>
              <Text style={style.name}>{t('HomeScreen:Name')}</Text>
            </View>
            <View>
              <Text style={style.WelcomeText2}>
                {t('HomeScreen:WelcomeText2')}
              </Text>
            </View>
          </View>
        }
        headerRight={{
          icon: require('../../../../assets/icons/Notification.png'),
          onPress: () => {
            console.log('Notification recieved');
          },
        }}
      />
      <View style={commonStyle.commonContentView}>
        <View
          onTouchStart={e => (TouchX.current = e.nativeEvent.pageX)}
          onTouchEnd={e => {
            if (TouchX.current - e.nativeEvent.pageX > 20) {
              if (currentPage < 3) {
                setCurrentPage(currentPage + 1);
              }
            }
            if (TouchX.current - e.nativeEvent.pageX < -20) {
              if (currentPage > 1 && currentPage <= 3) {
                setCurrentPage(currentPage - 1);
              }
            }
          }}>
          <PagerView currentPage={currentPage} />
        </View>
      </View>
      <View style={style.gridContainer}>
        {HomeGrid.map((item, index) => (
          // <TouchableOpacity
          //   onPress={() => console.log('hi')}
          //   style={style.gridItem}>
          <ImageBackground
            key={index}
            imageStyle={{height: '100%', width: '100%', resizeMode: 'cover'}}
            borderRadius={12}
            source={item.image}
            style={style.images}>
            <TouchableOpacity
              style={{height: '100%', width: '100%'}}
              activeOpacity={0.5}
              onPress={() => handlePress(item.name)}>
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
    </SafeAreaView>
  );
};
