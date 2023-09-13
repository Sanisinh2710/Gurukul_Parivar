import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, Platform, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  CustomNavigate,
  ImageZoomer,
  ScreenHeader,
  ScreenWrapper,
  ShareDownload,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS} from '../../../../utils';
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
  const TotalImages = route.params.totalImages;
  const AllData = route.params.data;
  const [Data, setData] = React.useState<Array<String>>(AllData);
  const currentImageUri = Data[pagination - 1];
  console.log(currentImageUri, 'uri');

  const [zoomImageModalVisible, setZoomModalVisiable] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    setWallpaper(`${BASE_URL}${currentImageUri}`);
  }, [currentImageUri]);

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
        <View
          onTouchEnd={() => setZoomModalVisiable(true)}
          style={[
            {
              height: '80%',
              marginTop: '5%',
              borderRadius: 8,
              backgroundColor: COLORS.primaryRippleColor,
            },
          ]}>
          <Image
            source={{uri: `${BASE_URL}${currentImageUri}`}}
            style={style.images}
          />
        </View>
        <ShareDownload
          wallpaper={Platform.OS === 'android' ? true : false}
          imgURL={wallpaper && wallpaper}
        />
      </View>
      <CustomNavigate
        text={`${pagination}/${TotalImages}`}
        handleNextPress={() => {
          if (pagination < TotalImages) {
            setPagination(pagination + 1);
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
