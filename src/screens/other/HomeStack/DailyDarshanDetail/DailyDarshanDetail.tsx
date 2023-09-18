import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Image, Platform, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Carousel,
  CarouselMethodsType,
  CustomNavigate,
  ImageZoomer,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
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

  const [pagination, setPagination] = React.useState<number>(
    currentImageIndex + 1,
  );

  const currentImageUri = React.useMemo(() => {
    return AllData?.[pagination - 1];
  }, [AllData, pagination]);

  const [zoomImageModalVisible, setZoomModalVisiable] =
    React.useState<boolean>(false);

  const ref = React.useRef<CarouselMethodsType>(null);

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
          itemWidth={Dimensions.get('window').width * 0.9}
          itemHeight={Dimensions.get('window').height * 0.7}
          itemGap={10}
          data={AllData}
          initialScrollToIndex={currentImageIndex}
          onSnapToItem={index => {
            setPagination(index + 1);
          }}
          renderItem={({item, index}) => {
            return (
              <View
                onTouchEnd={() => setZoomModalVisiable(true)}
                style={[
                  {
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image
                  source={{uri: `${BASE_URL}${item}`}}
                  style={style.images}
                  resizeMode="contain"
                />
              </View>
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
      <ImageZoomer
        images={[{url: `${BASE_URL}${currentImageUri}`}]}
        zoomModalVisible={zoomImageModalVisible}
        setZoomModalVisiable={setZoomModalVisiable}
      />
    </ScreenWrapper>
  );
};
