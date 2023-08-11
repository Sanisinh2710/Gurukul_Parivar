import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {ShareDownload} from '../../../../components/ui/ShareDownloadButton/ShareDownload';

export const DailyDarshanDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyDarshanDetail'>) => {
  const style = styles();
  const commonStyle = CommonStyle();
  const [pagination, setPagination] = React.useState<number>(1);
  const TotalImages = route.params.totalImages;

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
        <View style={{height: '80%', marginTop: '5%'}}>
          <Image
            source={{uri: `https://gurukul.taskgrids.com${route.params.image}`}}
            style={style.images}
          />
        </View>
        <ShareDownload wallpaper={true} />
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
