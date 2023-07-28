import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ImageBackground, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../assets/styles';
import {ScreenHeader} from '../../../components';
import {PagerView} from '../../../components/ui/Carousel/pagerView';
import {useCustomTheme} from '../../../hooks';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
export const HomeScreen = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const style = styles();
  const TouchX = React.useRef<any>();
  const {theme} = useCustomTheme();
  const {t, i18n} = useTranslation();
  const commonStyle = CommonStyle();
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
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          // backgroundColor: 'red',
          marginTop: 14,
          paddingHorizontal: 20,
        }}>
        <View style={{borderRadius: 12}}>
          <ImageBackground
            borderRadius={12}
            source={require('../../../../assets/images/Darshan.png')}
            style={style.images}>
            <LinearGradient
              colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 0.5)']}
              locations={[0, 1]}
              style={{flex: 1, borderRadius: 12}}>
              <Text style={style.textOverImage}>Daily Darshan</Text>
            </LinearGradient>
          </ImageBackground>
        </View>

        <ImageBackground
          borderRadius={12}
          source={require('../../../../assets/images/Quotes.png')}
          style={style.images}>
          <LinearGradient
            colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 0.5)']}
            locations={[0, 1]}
            style={{flex: 1, borderRadius: 12}}>
            <Text style={style.textOverImage}>Daily Quotes</Text>
          </LinearGradient>
        </ImageBackground>

        <ImageBackground
          borderRadius={12}
          source={require('../../../../assets/images/Calendar.png')}
          style={style.images}>
          <LinearGradient
            colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 0.5)']}
            locations={[0, 1]}
            style={{flex: 1, borderRadius: 12}}>
            <Text style={style.textOverImage}>Daily Update</Text>
          </LinearGradient>
        </ImageBackground>

        <ImageBackground
          borderRadius={12}
          source={require('../../../../assets/images/Darshan.png')}
          style={style.images}>
          <LinearGradient
            colors={['rgba(23, 23, 23, 0.1)', 'rgba(23, 23, 23, 0.5)']}
            locations={[0, 1]}
            style={{flex: 1, borderRadius: 12}}>
            <Text style={style.textOverImage}>Calendar</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
