import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootAuthStackParamList} from '../../../../types';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {MyProfileData} from '../../../../utils';
import {Image} from 'react-native';

export const EditProfile = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
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
        headerTitle={'Edit Profile'}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
        <FlatList
          data={MyProfileData(t)}
          renderItem={item => {
            return (
              <>
                <View
                  style={{
                    height: 60,
                    width: 'auto',
                    borderWidth: 0.25,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderColor: 'rgba(172, 43, 49, 0.3)',
                    borderRadius: 5,
                    marginBottom: '5%',
                    paddingLeft: '5%',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={style.title}>{item.item.title}</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={item.item.icon}
                      style={{height: 24, width: 24}}
                    />
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
