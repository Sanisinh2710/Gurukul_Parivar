import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {PhotoGallery, d, options} from '../../../../utils';
import {styles} from './styles';
export const DailyUpdateDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyUpdateDetail'>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const Data = route.params.data;
  console.log(Data, 'Data');

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Daily Updates'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {},
        }}
      />
      <View style={commonstyle.commonContentView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: '90%',
          }}>
          <View style={style.titleContainer}>
            <Text style={style.title}>{route.params.title}</Text>
            <Text style={style.date}>
              {d.toLocaleDateString('en-IN', options)}
            </Text>
          </View>
          <View style={style.imageContainer}>
            <Image
              source={{uri: `https://gurukul.taskgrids.com/${Data.images}`}}
              style={style.image}
            />
          </View>
          <View style={style.titleContainer}>
            <Text style={style.content}>{Data.description}</Text>
          </View>
          <View style={{marginTop: 24}}>
            <Text style={style.title}>Photo Gallery</Text>
            <FlatList
              horizontal
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
              data={PhotoGallery()}
              renderItem={item => (
                <TouchableOpacity activeOpacity={0.5}>
                  {item.item.image && (
                    <Image
                      source={item.item.image}
                      key={item.item.id}
                      style={{height: 105, width: 110, borderRadius: 8}}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
