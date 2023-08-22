import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {options} from '../../../../utils';
import {styles} from './styles';

export const DailyUpdateDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyUpdateDetail'>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const Data = route.params.data;

  const {t} = useTranslation();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('DailyUpdate.Heading')}
      />
      <View style={commonstyle.commonContentView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '90%',
          }}>
          <View style={style.titleContainer}>
            <Text style={style.title}>{route.params.title}</Text>
            <Text style={style.date}>
              {new Date(Data.date).toLocaleString('en-US', options)}
            </Text>
          </View>
          <View style={style.imageContainer}>
            <Image
              source={{uri: `${BASE_URL}/${Data.images[0]}`}}
              style={style.image}
            />
          </View>
          <View style={style.titleContainer}>
            <Text style={style.content}>{Data.description}</Text>
          </View>
          <View style={{marginTop: 24}}>
            <Text style={style.title}>{t('common.PhotoGallery')}</Text>
            <FlatList
              horizontal
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
              data={Data.images}
              renderItem={({item, index}) => (
                <>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate('dailyDarshanDetail', {
                        date: new Date(Data.date).toLocaleString(
                          'en-US',
                          options,
                        ),
                        data: Data.images,
                        totalImages: Data.images.length,
                        currentImageIndex: index,
                      })
                    }>
                    {item && (
                      <Image
                        source={{
                          uri: `${BASE_URL}/${item}`,
                        }}
                        key={index}
                        style={{height: 105, width: 110, borderRadius: 8}}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
