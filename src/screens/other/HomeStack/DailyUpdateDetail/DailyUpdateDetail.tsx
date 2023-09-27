import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS, options} from '../../../../utils';
import {styles} from './styles';

export const DailyUpdateDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyUpdateDetail'>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const Data = route.params.data;

  const {t} = useTranslation();

  const [imgLoad, setimgLoad] = React.useState<boolean>(false);

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

      <ScrollView
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          commonstyle.commonContentView,
          {
            paddingBottom: '10%',
          },
        ]}>
        <View style={style.titleContainer}>
          <Text style={style.title}>
            {route.params?.title}
            {'\n'}
            <Text style={style.date}>
              {new Date(Data.date).toLocaleString('en-US', options)}
            </Text>
          </Text>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('ImageZommer', {
              images: [{url: `${BASE_URL}${Data.images[0]}`}],
            });
          }}
          style={[style.imageContainer]}>
          {imgLoad && (
            <ActivityIndicator
              size={30}
              color={COLORS.primaryColor}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
          )}
          <Image
            source={{uri: `${BASE_URL}/${Data.thumbnail[0]}`}}
            style={style.image}
            resizeMode="contain"
            onLoadStart={() => setimgLoad(true)}
            onLoadEnd={() => setimgLoad(false)}
          />
        </Pressable>

        <View style={style.titleContainer}>
          <Text style={style.content}>{Data.description}</Text>
        </View>

        <View style={{marginTop: 24}}>
          <Text style={style.title}>{t('common.PhotoGallery')}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              gap: 10,
              marginTop: 10,
            }}
            data={Data.thumbnail}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('dailyDarshanDetail', {
                    date: new Date(Data.date).toLocaleString('en-US', options),
                    data: Data.images,
                    totalImages: Data.images.length,
                    currentImageIndex: index,
                  })
                }>
                {item && (
                  <View
                    style={{
                      height: 95,
                      width: 100,
                      borderRadius: 8,
                    }}>
                    <Image
                      source={{
                        uri: `${BASE_URL}/${item}`,
                      }}
                      key={index}
                      style={{
                        height: 95,
                        width: 100,
                        borderRadius: 8,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
