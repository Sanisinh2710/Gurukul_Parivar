import React from 'react';

import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {EditProfileProps} from '../../../../types';
import {MyProfileData} from '../../../../utils';
import {styles} from './styles';

export const EditProfile = ({navigation}: EditProfileProps) => {
  const {t} = useTranslation();
  const style = styles();

  const commonstyle = CommonStyle();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('EditProfile.Heading')}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
        <FlatList
          data={MyProfileData(t)}
          renderItem={({item, index}) => {
            return (
              <>
                <View
                  onTouchEnd={() => {
                    navigation.navigate('ProfileEdit', {
                      formStep: index + 1,
                    });
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '5%',
                    borderRadius: 8,
                    borderWidth: 0.4,
                    borderColor: 'rgba(172, 43, 49, 0.3)',
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      height: 60,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingLeft: '5%',
                    }}>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={style.title}>{item.title}</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={item.icon}
                        style={{height: 24, width: 24}}
                      />
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
