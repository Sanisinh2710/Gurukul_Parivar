import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {GurukulEventGetApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, monthsArray} from '../../../../utils';
import {styles} from './styles';

export const GurukulEvents = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t} = useTranslation();
  const [EventData, setEventData] = React.useState<any>([]);
  const [searchListData, setSearchListData] =
    React.useState<Array<{[key: string]: any}>>(EventData);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const style = styles();
  const commonstyle = CommonStyle();

  const searchEvent = (val: string) => {
    if (val) {
      setSearchListData(
        EventData.filter((item: any) => {
          return (
            item?.title?.toLowerCase()?.includes(val?.toLowerCase()) ||
            new Date(item?.date)?.getDate()?.toString().includes(val) ||
            monthsArray[new Date(item?.date).getMonth()]
              ?.toLocaleLowerCase()
              .includes(val.toLocaleLowerCase())
          );
        }),
      );
    } else {
      setSearchListData(EventData);
    }
  };

  const getAndSetEventData = async () => {
    try {
      const res = await GurukulEventGetApi();

      if (res.resType === 'SUCCESS') {
        setEventData(res.data.gurukul_events);
        setSearchListData(res.data.gurukul_events);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useMemo(async () => {
    setLoader(true);
    await getAndSetEventData();
    setLoader(false);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAndSetEventData();
    setRefreshing(false);
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Gurukul Events'}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: '3%'}]}>
        {loader ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={[COLORS.primaryColor, COLORS.green]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{paddingBottom: '10%'}}
            showsVerticalScrollIndicator={false}>
            <View style={style.modelSearchView}>
              <View style={style.iconView}>
                <Image source={AllIcons.Search} style={style.iconStyle} />
              </View>
              <TextInput
                // value={searchvalue}
                placeholder={t('common.Search')}
                placeholderTextColor={COLORS.lightModetextColor}
                style={[style.formTextInput, {width: '80%'}]}
                onChangeText={val => {
                  searchEvent(val.trim());
                }}
              />
            </View>
            {searchListData.length > 0 ? (
              searchListData.map((item, index) => {
                return (
                  <View key={index} style={style.textBoxContainer}>
                    <View style={style.dateContainer}>
                      <Text style={style.date}>
                        {new Date(item.date).getDate()}
                      </Text>
                      <Text style={style.day}>
                        {monthsArray[new Date(item.date).getMonth()]}
                      </Text>
                    </View>
                    <View style={style.contentContainer}>
                      <Text style={style.content1}>{item.title}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '70%',
                          gap: 6,
                        }}>
                        <Text style={style.content2}>
                          Time: {item.start_time}
                          {'  -'}
                        </Text>
                        <Text style={style.content2}>{item.end_time}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{height: Dimensions.get('window').height * 0.65}}>
                <NoData />
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </ScreenWrapper>
  );
};
