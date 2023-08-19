import {AllImages} from '../../../../assets/images';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ScreenWrapper} from '../ScreenWrapper';
import {PrimaryButton} from '../Buttons';
import {CommonStyle} from '../../../../assets/styles';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';

export const CommingSoon = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<RootBottomTabParamList>,
  NativeStackScreenProps<RootStackParamList>
>): React.JSX.Element => {
  const style = styles();
  const CommonStyles = CommonStyle();

  const {t} = useTranslation();
  return (
    <ScreenWrapper>
      <View
        style={[
          CommonStyles.commonContentView,
          {flex: 0.8, justifyContent: 'center'},
        ]}>
        <View>
          <Image
            source={AllImages.CommingSoon}
            style={{
              width: 213,
              height: 87,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View>
          <Text style={style.soon}>Coming Soon...</Text>
          <Text style={style.NoDataContent}>
            Looks like our data elves are on a break.
          </Text>
          <Text style={style.NoDataContent}>
            We'll conjure up some information soon.
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={'Go to Home Page'}
        onPress={() => navigation.goBack()}
        buttonStyle={{paddingHorizontal: 20, flex: 0.2}}
      />
    </ScreenWrapper>
  );
};
