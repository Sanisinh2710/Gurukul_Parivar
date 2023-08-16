/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, Text, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootAuthStackParamList} from '../../../../types';
import {COLORS} from '../../../../utils';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CommonStyle} from '../../../../../assets/styles';

export const LiveSatsang = ({
  navigation,
}: NativeStackScreenProps<RootAuthStackParamList>) => {
  // const style = styles();
  const {t} = useTranslation();
  const commonstyle = CommonStyle();

  const [playing, setPlaying] = React.useState(false);

  const onStateChange = React.useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Live Satsang'}
        headerRight={{
          icon: AllIcons.Filter,
          onPress: () => {},
        }}
      />
      <View style={commonstyle.commonContentView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: '3%', gap: 10, paddingBottom: '30%'}}>
            <Text style={{color: COLORS.black}}>YouTube Live Katha</Text>
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={'TtS2tLDauBI'}
              onChangeState={onStateChange}
              webViewProps={{
                containerStyle: {borderRadius: 15},
              }}
            />
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={'TtS2tLDauBI'}
              onChangeState={onStateChange}
              webViewProps={{
                containerStyle: {borderRadius: 15},
              }}
            />
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={'TtS2tLDauBI'}
              onChangeState={onStateChange}
              webViewProps={{
                containerStyle: {borderRadius: 15},
              }}
            />
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={'TtS2tLDauBI'}
              onChangeState={onStateChange}
              webViewProps={{
                containerStyle: {borderRadius: 15},
              }}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
