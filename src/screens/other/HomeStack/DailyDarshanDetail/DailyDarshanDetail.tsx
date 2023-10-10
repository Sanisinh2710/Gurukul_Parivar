import React from 'react';

import {CommonStyle} from '@assets';
import {
  Carousel,
  CarouselRef,
  CustomNavigate,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '@components';
import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {COLORS} from '@utils';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {styles} from './styles';

export const DailyDarshanDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyDarshanDetail'>) => {
  const style = styles();
  const commonStyle = CommonStyle();
  const currentImageIndex = route.params.currentImageIndex;

  const TotalImages = route.params.totalImages;
  const AllData = route.params.data;

  const [imgLoad, setimgLoad] = React.useState<boolean[]>([]);

  const [pagination, setPagination] = React.useState<number>(
    currentImageIndex + 1,
  );

  const currentImageUri = React.useMemo(() => {
    return AllData?.[pagination - 1];
  }, [AllData, pagination]);

  const ref = React.useRef<CarouselRef>(null);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={route.params.date}
      />
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <Carousel
          ref={ref}
          contentContainerStyle={{
            marginTop: '5%',
          }}
          itemWidth={Dimensions.get('window').width}
          itemHeight={Dimensions.get('window').height * 0.65}
          itemGap={20}
          data={AllData}
          initialScrollToIndex={currentImageIndex}
          onSnapToItem={index => {
            setPagination(index + 1);
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('ImageZommer', {
                    images: [{url: `${BASE_URL}${item}`}],
                  });
                }}
                style={style.imageView}>
                {imgLoad[index] && (
                  <ActivityIndicator
                    size={30}
                    color={COLORS.primaryColor}
                    style={style.activityIndicator}
                  />
                )}
                <Image
                  source={{uri: `${BASE_URL}${item}`}}
                  style={style.images}
                  resizeMode="contain"
                  onLoadStart={() => {
                    let clone = [...imgLoad];
                    clone[index] = true;
                    setimgLoad(clone);
                  }}
                  onLoadEnd={() => {
                    let clone = [...imgLoad];
                    clone[index] = false;
                    setimgLoad(clone);
                  }}
                />
              </Pressable>
            );
          }}
        />
        <ShareDownload
          wallpaper={Platform.OS === 'android' ? true : false}
          imgURL={`${BASE_URL}${currentImageUri}`}
        />
      </View>
      <CustomNavigate
        text={`${pagination}/${TotalImages}`}
        handleNextPress={() => {
          if (pagination < TotalImages) {
            setPagination(pagination + 1);
          } else {
            setPagination(1);
          }
          ref.current?.handleNext();
        }}
        handlePrevPress={() => {
          if (pagination > 1) {
            setPagination(pagination - 1);
            ref.current?.handlePrev();
          }
        }}
      />
    </ScreenWrapper>
  );
};
