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
  const [pagination, setPagination] = React.useState<number>(1);

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
          <Image source={route.params.image} style={style.images} />
        </View>
        <ShareDownload wallpaper={true} />
      </View>
      <CustomNavigate
        text={`${pagination}/4`}
        handleNextPress={() => {
          if (pagination < 4) {
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
