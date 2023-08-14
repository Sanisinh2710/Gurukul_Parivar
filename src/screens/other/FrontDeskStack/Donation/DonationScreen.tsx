import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {AllIcons} from '../../../../../assets/icons';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../../../utils';

export const DonationScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const {t} = useTranslation();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('Donation.Heading')}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <View>
          <Text style={{color: COLORS.primaryColor}}>
            {t('Donation.Quote')}
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};
