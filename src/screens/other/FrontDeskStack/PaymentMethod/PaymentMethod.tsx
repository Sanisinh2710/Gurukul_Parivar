import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS, Payment} from '../../../../utils';
import {styles} from './styles';

export const PaymentMethod = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [PaymentMethod, setPaymentMethod] = React.useState('');

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
        <View style={{marginTop: '5%'}}>
          {Payment.map(item => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setPaymentMethod(item.title);
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
                    <Image
                      source={item.icon}
                      style={{marginRight: 10, height: 24, width: 24}}
                    />
                    <Text style={{fontSize: 16, color: 'black'}}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={
                      item.title === PaymentMethod
                        ? style.selectedStyles
                        : style.unselectedStyles
                    }>
                    {item.title === PaymentMethod && (
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 60,
                          backgroundColor: COLORS.primaryColor,
                        }}></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{}}>
            <PrimaryButton
              title="Proceed Payment"
              onPress={() => console.log('Payment done')}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};
