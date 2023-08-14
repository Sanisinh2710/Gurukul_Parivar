/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootAuthStackParamList} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Button} from 'react-native';
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

  const togglePlaying = React.useCallback(() => {
    setPlaying(prev => !prev);
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
          onPress: () => {
            console.log('Hi');
          },
        }}
      />
      <View style={commonstyle.commonContentView}>
        <View style={{marginTop: '3%', gap: 10}}>
          <Text style={{color: COLORS.black}}>YouTube Live Katha</Text>
          <YoutubePlayer
            height={210}
            play={playing}
            videoId={'TtS2tLDauBI'}
            onChangeState={onStateChange}
            webViewProps={{
              containerStyle: {borderRadius: 15},
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
