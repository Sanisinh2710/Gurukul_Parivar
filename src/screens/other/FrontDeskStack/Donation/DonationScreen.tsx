import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PrimaryButton,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
  SimpleDropDown,
} from '../../../../components';
import {GurukulBranchGetApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import {styles} from './styles';

export const DonationScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const commonstyle = CommonStyle();
  const [GurukulList, setGurukulList] = React.useState<{[key: string]: any}[]>(
    [],
  );
  const [changeValue, setChangeValue] = React.useState(1);
  const [selectedItem, setselectedItem] = React.useState('0');

  React.useMemo(async () => {
    const response = await GurukulBranchGetApi();
    if (response.resType === 'SUCCESS' && response.data.branches.length > 0) {
      setGurukulList(response.data.branches);
    } else {
      Toast.show(response.message, 2);
    }
  }, []);
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
      <ScrollView>
        <View style={[commonstyle.commonContentView, {flex: 1}]}>
          <View>
            <Text style={{color: COLORS.primaryColor}}>
              {t('Donation.Quote')}
            </Text>
          </View>
          {/* select box */}
          <View style={{height: '8%', marginBottom: '16%'}}>
            <View
              style={{
                marginTop: '5%',
              }}>
              <Text
                style={{
                  ...CustomFonts.body.large14,
                  color: COLORS.lightModetextColor,
                  fontSize: 15,
                }}>
                {t('uploadPhoto.DropdownTitle')}
              </Text>
              <View style={style.dropdownStyle}>
                <SimpleDropDown
                  placeholder="Select Gurukul Branch"
                  label="Gurukul"
                  dropDownList={GurukulList}
                  type={'simple'}
                  value={changeValue}
                  onChange={setChangeValue}
                  onBlur={function (...event: any[]): void {
                    throw new Error('Function not implemented.');
                  }}
                  setFocused={function (
                    value: React.SetStateAction<boolean>,
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
            </View>
          </View>
          {/* amount text box */}
          <View style={{marginBottom: '5%'}}>
            <Text
              style={{
                ...CustomFonts.body.large14,
                color: COLORS.lightModetextColor,
                fontSize: 15,
              }}>
              {t('Donation.Amount')}
            </Text>
            <View
              style={[
                style.dropdownStyle,
                {display: 'flex', flexDirection: 'row'},
              ]}>
              <View style={{flexDirection: 'row', gap: 8, paddingLeft: 8}}>
                <Text
                  style={{
                    color: COLORS.primaryColor,
                    fontSize: 16,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  {'\u20B9'}
                </Text>
                <Text
                  style={{
                    color: COLORS.primaryColor,
                    fontSize: 16,
                    borderRightWidth: 1,
                    height: 25,
                    borderRightColor: COLORS.primaryLightBorderColor,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>

              <TextInput
                keyboardType="number-pad"
                onChangeText={val => {
                  val === '' && setselectedItem('');
                }}
                style={[{width: '90%', marginLeft: 6}]}
                placeholder={t('Donation.Placeholder')}>
                {selectedItem.slice(1)}
              </TextInput>
            </View>
          </View>
          {/* radio label */}
          <RadioLable
            wantFullSpace={false}
            customStyle={{
              borderRadius: 60,
              height: 40,
              borderWidth: 0,
            }}
            value={selectedItem}
            onChange={setselectedItem}
            list={[
              {name: '\u20B9100'},
              {name: '\u20B9500'},
              {name: '\u20B91000'},
              {name: '\u20B92500'},
            ]}
            showHeading={false}
          />
          {/* text box */}
          <View style={{marginTop: '5%', marginBottom: '33%'}}>
            <Text
              style={{
                ...CustomFonts.body.large14,
                color: COLORS.lightModetextColor,
                fontSize: 15,
              }}>
              {t('Donation.OtherNote')}
            </Text>
            <View>
              <TextInput
                multiline
                numberOfLines={3}
                style={style.dropdownStyle2}
                placeholder={t('Donation.Placeholder')}></TextInput>
            </View>
          </View>
          <PrimaryButton
            title={t('common.Next')}
            onPress={() => navigation.navigate('PaymentMethod')}
          />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{color: 'black'}}>
              By proceeding you agree with our{' '}
              <Text style={{color: COLORS.primaryColor}} onPress={() => {}}>
                Terms & Condition for Donation
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
