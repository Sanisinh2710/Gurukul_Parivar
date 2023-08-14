import {AllImages} from '../../../../assets/images';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';

export const NoData = React.memo((): React.JSX.Element => {
  const style = styles();
  const {t} = useTranslation();
  return (
    <>
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
          <Text style={style.NoDataTitle}>{t('NoData.Title')}</Text>
          <Text style={style.NoDataContent}>{t('NoData.Content')}</Text>
        </View>
      </View>
    </>
  );
});
