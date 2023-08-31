import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';

export const PaymentMethod = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [language, setLanguage] = React.useState('');

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
        headerTitle={'Select Payment Method'}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <TouchableOpacity
          onPress={() => {
            setLanguage('a');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(172, 43, 49, 0.3)',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={AllIcons.Card} style={{height: 24, width: 24}} />

              <Text style={{fontSize: 16, color: 'black'}}>Credit/Debit</Text>
            </View>
            <View
            //   style={

            //       ? style.selectedStyles
            //       : style.unselectedStyles
            //   }
            >
              {
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 60,
                    backgroundColor: COLORS.primaryColor,
                  }}></View>
              }
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLanguage('a');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(172, 43, 49, 0.3)',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={AllIcons.Bank} style={{height: 24, width: 24}} />
              <Text style={{fontSize: 16, color: 'black'}}>Net Banking</Text>
            </View>
            <View
            //   style={
            //     Languages.hn === language
            //       ? style.selectedStyles
            //       : style.unselectedStyles
            //   }
            >
              {
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 60,
                    backgroundColor: COLORS.primaryColor,
                  }}></View>
              }
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLanguage('a');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              padding: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'rgba(172, 43, 49, 0.3)',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={AllIcons.Money} style={{height: 24, width: 24}} />

              <Text style={{fontSize: 16, color: 'black'}}>UPI</Text>
            </View>
            <View
            //   style={
            //     Languages.gu === language
            //       ? style.selectedStyles
            //       : style.unselectedStyles
            //   }
            >
              {
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 60,
                    backgroundColor: COLORS.primaryColor,
                  }}></View>
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};
