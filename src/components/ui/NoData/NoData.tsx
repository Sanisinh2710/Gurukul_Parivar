import React from 'react';

import {AllImages} from '@assets';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';

type NoDataProps = {
  title?: string;
  content?: string;
};

export const NoData = React.memo(
  ({ title, content }: NoDataProps): React.JSX.Element => {
    const style = styles();
    const { t } = useTranslation();
    return (
      <View style={style.noDataWrapper}>
        <View
          style={style.noDataImgView}>
          <Image
            source={AllImages.NoData}
            style={style.noDataImg}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={style.NoDataTitle}>{title ?? t('NoData.Title')}</Text>
          <Text style={style.NoDataContent}>
            {content ?? t('NoData.Content')}
          </Text>
        </View>
      </View>
    );
  },
);
