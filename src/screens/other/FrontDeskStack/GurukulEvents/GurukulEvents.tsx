import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {
  DropDownModel,
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GurukulEventGetApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS, monthsArray, options} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
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
  const [viewEventModal, setEventModal] = React.useState(false);
  const [currentModalData, setCurrentModalData] = React.useState<{
    [key: string]: any;
  }>();

  const style = styles();
  const commonstyle = CommonStyle();

  const searchEvent = (val: string) => {
    const timer = setTimeout(() => {
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
    }, 800);

    return () => clearTimeout(timer);
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

  const setModalData = (item: any) => {
    setEventModal(true);
    setCurrentModalData({
      date: new Date(item.date).toLocaleDateString('en-in', options),
      title: item.title,
      start_time: item.start_time,
      end_time: item.end_time,
    });
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('frontDesk.Event')}
      />
      <View style={[commonstyle.commonContentView, style.wrapperView]}>
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
                style={[style.formTextInput]}
                onChangeText={val => {
                  searchEvent(val.trim());
                }}
              />
            </View>

            {searchListData.length > 0 ? (
              searchListData.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => setModalData(item)}
                    key={index}
                    style={style.textBoxContainer}>
                    <View style={style.dateContainer}>
                      <Text style={style.date}>
                        {new Date(item.date).getDate()}
                      </Text>
                      <Text style={style.day}>
                        {monthsArray[new Date(item.date).getMonth()]}
                      </Text>
                    </View>
                    <View style={style.contentContainer}>
                      <Text style={style.content1} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View style={style.timeContainer}>
                        <Text style={style.content2}>
                          Time: {item.start_time}
                          {'  -'}
                        </Text>
                        <Text style={style.content2}>{item.end_time}</Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })
            ) : (
              <View style={style.noDataView}>
                <NoData />
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <DropDownModel
        viewPhoto={true}
        modelVisible={viewEventModal}
        setModelVisible={setEventModal}
        customModelchild={
          currentModalData && (
            <View style={style.dropDownView}>
              <View style={style.dropDownImageContainer}>
                <View style={style.modalDateContainer}>
                  <Text style={style.modalDateText}>
                    {currentModalData.date} {currentModalData.month} {}
                  </Text>
                </View>
                <View style={style.modalTitleContainer}>
                  <Text style={style.modalTitle}>{currentModalData.title}</Text>
                </View>
                <View style={style.modalTimeContainer}>
                  <Text style={style.modalTime}>
                    Time: {currentModalData.start_time} -{' '}
                    {currentModalData.end_time}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
        type={'simple'}
        modalHeight={'40%'}
      />
    </ScreenWrapper>
  );
};
