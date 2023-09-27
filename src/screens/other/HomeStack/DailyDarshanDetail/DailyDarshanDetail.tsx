import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  View,
} from 'react-native';
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
import {COLORS} from '../../../../utils';
import {styles} from './styles';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const DailyDarshanDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyDarshanDetail'>) => {
  const style = styles();
  const commonStyle = CommonStyle();
  const currentImageIndex = route.params.currentImageIndex;

  const TotalImages = route.params.totalImages;
  const AllData = route.params.data;

  const [imgLoad, setimgLoad] = React.useState<boolean>(false);

  const [pagination, setPagination] = React.useState<number>(
    currentImageIndex + 1,
  );

  const currentImageUri = React.useMemo(() => {
    return AllData?.[pagination - 1];
  }, [AllData, pagination]);

  const [zoomImageModalVisible, setZoomModalVisiable] =
    React.useState<boolean>(false);

  const ref = React.useRef<CarouselMethodsType>(null);
  const scale = useSharedValue(1);
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
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
              <>
                <View
                  onTouchEnd={() =>
                    navigation.navigate('zoomImage', {image: item})
                  }
                  style={[
                    {
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
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
                    style={[style.images]}
                    source={{uri: `${BASE_URL}${item}`}}
                    resizeMode="contain"
                    onLoadStart={() => setimgLoad(true)}
                    onLoadEnd={() => setimgLoad(false)}
                  />
                </View>
              </>
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
