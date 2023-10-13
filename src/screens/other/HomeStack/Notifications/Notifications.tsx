import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AllImages, CommonStyle} from '@assets';
import {Loader, NoData, ScreenHeader, ScreenWrapper} from '@components';
import {DailyUpdatesApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {useDispatch} from 'react-redux';
import {UPDATE_STATUS} from '@redux/ducks/notificationSlice';

export const Notifications = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const commonStyle = CommonStyle();
  const {t} = useTranslation();

  const dispatch = useAppDispatch();

  const {notifications} = useAppSelector(state => state.notifications);
  console.log(notifications);

  React.useEffect(() => {
    setLoader(true);

    dispatch(UPDATE_STATUS({status: true, isNotification: false}));
    setLoader(false);
  }, []);

  const handleNavigation = (type: string) => {
    switch (type) {
      case 'daily_darshan':
        navigation.navigate('dailyDarshan');
        break;
      case 'daily_quote':
        navigation.navigate('dailyQuotes');
        break;

      case 'daily_update':
        navigation.navigate('dailyUpdates');
        break;

      case 'live_satsang':
        navigation.navigate('liveSatsang');
        break;

      default:
        break;
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('homeScreen.Notifications')}
      />
      <View style={commonStyle.commonContentView}>
        {loader ? (
          <Loader screenHeight={'95%'} />
        ) : (
          <>
            {notifications.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: '30%',
                }}
                data={notifications}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => handleNavigation(item.type)}>
                      <View style={style.updateContainer}>
                        <View style={style.updateView}>
                          <View style={style.imageContainer}>
                            <Image
                              source={AllImages.AppLogo}
                              style={style.image}
                            />
                          </View>
                        </View>
                        <View style={{width: '80%'}}>
                          <View style={style.textContainer}>
                            <Text style={style.title} numberOfLines={2}>
                              {item.message}
                            </Text>
                            {/* <Text style={style.time}>{item.created_at}</Text> */}
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
