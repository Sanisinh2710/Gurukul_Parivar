import React from 'react';

import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {AllImages} from '../../../../assets/images';
import {styles} from './styles';

type NoDataProps = {
  title?: string;
  content?: string;
};

export const NoData = React.memo(
  ({title, content}: NoDataProps): React.JSX.Element => {
    const style = styles();
    const {t} = useTranslation();
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            width: '70%',
            height: '40%',
            alignSelf: 'center',
          }}>
          <Image
            source={AllImages.NoData}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={style.NoDataTitle}>{title ?? t('NoData.Title')}</Text>
          <Text style={style.NoDataContent}>
            {content ?? t('NoData.Content')}
          </Text>
        </View>
      </View>
    );
  },
);
