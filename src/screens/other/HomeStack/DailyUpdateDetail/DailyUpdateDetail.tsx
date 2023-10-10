import React from 'react';

import {CommonStyle} from '@assets';
import {ScreenHeader, ScreenWrapper} from '@components';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {COLORS, options} from '@utils';
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

  const navigateScreen = (index: number) => {
    navigation.navigate('dailyDarshanDetail', {
      date: new Date(Data.date).toLocaleString('en-US', options),
      data: Data.images,
      totalImages: Data.images.length,
      currentImageIndex: index,
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
              style={style.activityIndicator}
            />
          )}
          <Image
            source={{uri: `${BASE_URL}/${Data.thumbnail[0]}`}}
            style={style.image}
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
            contentContainerStyle={style.flatListContentStyle}
            data={Data.thumbnail}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateScreen(index)}>
                {item && (
                  <View style={style.horizontalImageContainer}>
                    <Image
                      source={{
                        uri: `${BASE_URL}/${item}`,
                      }}
                      key={index}
                      style={style.horizontalImageStyle}
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
