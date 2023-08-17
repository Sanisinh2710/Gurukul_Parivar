/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AllIcons} from '../../../../assets/icons';
import {AllImages} from '../../../../assets/images';
import {CommonStyle} from '../../../../assets/styles';
import {
  DropDownModel,
  PrimaryButton,
  RoundedIcon,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {removeAuthToken, removeProfToken} from '../../../services';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';
import {COLORS, EditProfile} from '../../../utils';
import {styles} from './styles';

export const ProfileScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const [modelVisible, setModelVisible] = React.useState(false);
  const [modalType, setModelType] = React.useState('');

  const {t, i18n} = useTranslation();

  const ProfileList = React.useMemo(() => {
    return EditProfile(t, i18n);
  }, [t, i18n]);

  const style = styles();
  const commonStyle = CommonStyle();

  const handlePress = (val: string) => {
    switch (val) {
      case 'user':
        navigation.navigate('editProfile');
        break;
      case 'translation':
        navigation.navigate('changeLanguage');
        break;
      case 'logout':
        setModelType('logout');
        setModelVisible(!modelVisible);
        break;
      default:
        break;
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <Text style={style.title}>{t('myProfile.Heading')}</Text>
          </View>
        }
        headerRight={{
          icon: AllIcons.Notification,
          onPress: () => {},
        }}
      />
      <ScrollView
        contentContainerStyle={[
          commonStyle.commonContentView,
          {paddingBottom: '25%'},
        ]}
        showsVerticalScrollIndicator={true}>
        <View style={style.imageContainer}>
          <Image source={AllImages.Person} style={{height: 64, width: 64}} />
          <View style={{justifyContent: 'center', marginLeft: '5%'}}>
            <Text style={style.profileName}>{t('myProfile.Name')}</Text>
            <Text style={{color: 'rgba(23,23,23,0.5)'}}>+91-9873957274</Text>
            <View style={style.familyIdView}>
              <Text style={style.familyIdText}>{t('myProfile.ID')}:148410</Text>
            </View>
          </View>
        </View>
        <View style={style.mapContainer}>
          {ProfileList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(item.id);
                }}>
                <View
                  style={[
                    style.listView,
                    {borderBottomWidth: item.name === 'Logout' ? 0 : 1},
                  ]}>
                  <RoundedIcon
                    icon={item.image}
                    onPress={() => {}}
                    imageStyle={{width: 20, height: 20}}
                  />
                  <View style={{justifyContent: 'center', marginLeft: '5%'}}>
                    <Text style={style.listName}>{item.name} </Text>
                  </View>
                  <View style={style.languageContainer}>
                    <Text style={{color: COLORS.primaryColor, fontSize: 14}}>
                      {item.language}
                    </Text>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                    {item.rightIcon && (
                      <Image
                        source={item.rightIcon}
                        style={{height: 24, width: 24}}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <PrimaryButton
            title={t('DeleteModel.DltBtn')}
            onPress={() => {
              setModelType('deleteAcc');
              setModelVisible(!modelVisible);
            }}
            buttonColor={'rgba(172, 43, 49, 0.1)'}
            titleColor={COLORS.primaryColor}
            buttonStyle={style.btnStyle}
            textStyle={{fontSize: 16}}
          />
        </View>
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          type={'phone'}
          modalHeight={'50%'}
          customModelchild={
            <View style={{alignItems: 'center', marginTop: '5%'}}>
              <View style={{height: 80, width: 80}}>
                <LinearGradient
                  colors={['rgba(172, 43, 49, 0.15)', 'rgba(172, 43, 49, 0)']}
                  locations={[0, 1]}
                  style={style.linearGradient}>
                  {modalType === 'logout' ? (
                    <View style={style.iconRectangleView}>
                      <View style={style.iconContainer}>
                        <Image
                          source={AllIcons.LogoutArrow}
                          style={style.logoutIcon}
                        />
                      </View>
                    </View>
                  ) : (
                    <Image source={AllIcons.Delete} style={style.deleteIcon} />
                  )}
                </LinearGradient>
              </View>
              <View>
                <Text style={style.modalHeader}>
                  {modalType === 'logout'
                    ? t('LogoutModel.Title')
                    : t('DeleteModel.Title')}
                </Text>
                <Text style={style.modalTextContent}>
                  {modalType === 'logout'
                    ? t('LogoutModel.Content')
                    : t('DeleteModel.Content')}
                </Text>
              </View>
              <View style={style.modalbtnView}>
                <PrimaryButton
                  onPress={() => {
                    setModelVisible(!modelVisible);
                  }}
                  buttonColor="rgba(172, 43, 49, 0.05)"
                  buttonStyle={style.modalbtn}
                  titleColor="black"
                  title={t('LogoutModel.CancelBtn')}
                />
                <PrimaryButton
                  onPress={
                    modalType === 'logout'
                      ? () => {
                          const resRemoveAuthToken = removeAuthToken();
                          const resRemoveProfToken = removeProfToken();

                          if (
                            resRemoveAuthToken === 'SUCCESS' &&
                            resRemoveProfToken === 'SUCCESS'
                          ) {
                            navigation.replace('Auth');
                          }
                        }
                      : () => {}
                  }
                  buttonStyle={{width: '42%'}}
                  title={
                    modalType === 'logout'
                      ? t('LogoutModel.LogoutBtn')
                      : t('DeleteModel.DltBtn')
                  }
                />
              </View>
            </View>
          }
        />
      </ScrollView>
    </ScreenWrapper>
  );
};
