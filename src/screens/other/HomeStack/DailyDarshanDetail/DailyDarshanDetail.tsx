import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Image, Platform, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  CustomNavigate,
  ImagePagerView,
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

  const [wallpaper, setWallpaper] = React.useState('');
  const [pagination, setPagination] = React.useState<number>(
    currentImageIndex + 1,
  );
  const [itemIndex, setItemIndex] = React.useState(0);

  const TotalImages = route.params.totalImages;
  const AllData = route.params.data;
  const [Data, setData] = React.useState<Array<String>>(AllData);
  const currentImageUri = Data[pagination - 1];

  const [zoomImageModalVisible, setZoomModalVisiable] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setWallpaper(`${BASE_URL}${currentImageUri}`);
  }, [currentImageUri]);

  React.useEffect(() => {
    if (itemIndex !== null && itemIndex !== undefined) {
      setPagination(itemIndex + 1);
    }
  }, [itemIndex]);

  console.log(Data, pagination, 'data');

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
        <ImagePagerView
          contentContainerStyle={{
            height: Dimensions.get('window').height * 0.7,
          }}
          itemWidth={Dimensions.get('window').width * 0.91}
          data={Data}
          onSnapToItem={index => {
            setItemIndex(index);
          }}
          scrollByIndex={pagination - 1}
          renderItem={({item, index}) => {
            return (
              <>
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
              </>
            );
          }}
        />
        <View
          style={{
            top: `${-15}%`,
          }}>
          <ShareDownload
            wallpaper={Platform.OS === 'android' ? true : false}
            imgURL={`${BASE_URL}${Data?.[itemIndex]}`}
          />
        </View>
      </View>
      <CustomNavigate
        text={`${pagination}/${TotalImages}`}
        handleNextPress={() => {
          if (pagination < TotalImages) {
            setPagination(pagination + 1);
          } else {
            setPagination(1);
          }
        }}
        handlePrevPress={() => {
          if (pagination > 1) {
            setPagination(pagination - 1);
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
