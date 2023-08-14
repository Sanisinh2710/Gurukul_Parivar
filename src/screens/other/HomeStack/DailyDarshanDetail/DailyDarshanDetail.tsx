import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {ShareDownload} from '../../../../components/ui/ShareDownloadButton/ShareDownload';
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
  const TotalImages = route.params.totalImages;
  const AllData = route.params.data;
  const [Data, setData] = React.useState<Array<String>>(AllData);
  const currentImageUri = Data[pagination - 1];

  React.useEffect(() => {
    setWallpaper(`https://gurukul.taskgrids.com${currentImageUri}`);
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
        <>
          <View style={{height: '80%', marginTop: '5%'}}>
            <Image
              source={{
                uri: `https://gurukul.taskgrids.com${currentImageUri}`,
              }}
              style={style.images}
            />
          </View>

          <ShareDownload wallpaper={true} imgURL={wallpaper && wallpaper} />
        </>
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
    </ScreenWrapper>
  );
};
