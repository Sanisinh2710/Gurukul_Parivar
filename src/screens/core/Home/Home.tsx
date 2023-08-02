import React from 'react';

import {useTranslation} from 'react-i18next';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {HomeGrid} from '../../../utils';
import {styles} from './styles';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AllIcons} from '../../../../assets/icons';
import {useAppSelector} from '../../../redux/hooks';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';

export const HomeScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const style = styles();
  const TouchX = React.useRef<any>();
  const theme = useAppSelector(state => state.theme.theme);

  const {t} = useTranslation();
  const commonStyle = CommonStyle();

  function handlePress(val: any) {
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

      default:
        break;
    }
  }
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.WelcomeText1}>
                {t('homeScreen.WelcomeText1')}{' '}
              </Text>
              <Text style={style.name}>{t('homeScreen.Name')}</Text>
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
        <View style={style.gridContainer}>
          {HomeGrid(t).map((item, index) => (
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
      </View>
    </ScreenWrapper>
  );
};
