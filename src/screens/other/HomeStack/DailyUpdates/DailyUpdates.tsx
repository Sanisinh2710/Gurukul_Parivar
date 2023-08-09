import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {AllIcons} from '../../../../../assets/icons';
import {useTranslation} from 'react-i18next';
import {COLORS, DailyUpdate} from '../../../../utils';

export const DailyUpdates = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const commonStyle = CommonStyle();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Daily Update'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {},
        }}
      />
      <View style={commonStyle.commonContentView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '35%',
          }}
          data={DailyUpdate}
          renderItem={item => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate('dailyUpdateDetail', {
                    title: item.item.title,
                  });
                }}>
                <View style={style.updateContainer}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20%',
                    }}>
                    <View style={style.imageContainer}>
                      <Image source={item.item.image} style={style.image} />
                    </View>
                  </View>
                  <View style={{width: '80%'}}>
                    <View style={style.textContainer}>
                      <Text style={style.title}>{item.item.title}</Text>
                      <Text style={style.time}>{item.item.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
