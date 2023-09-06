import React from 'react';

import {BASE_URL} from '@env';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {
  DropDownModel,
  PrimaryButton,
  RoundedIcon,
  ScreenHeader,
  ScreenWrapper,
  SecondaryButton,
} from '../../../components';
import {
  DeleteMydataApi,
  PersonalInfoGetDetailsApi,
  PersonalInfoSaveDetailsApi,
  getUserData,
  removeAuthToken,
  setUserData,
} from '../../../services';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';
import {
  COLORS,
  CustomBackendDateSplitAndFormat,
  EditProfile,
  captureImage,
  chooseFile,
} from '../../../utils';
import {styles} from './styles';

export const ProfileScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const [modelVisible, setModelVisible] = React.useState(false);
  const [viewPhotoModel, setPhotoModel] = React.useState(false);
  const [modalType, setModelType] = React.useState('');
  const [profileModel, setProfileModel] = React.useState(false);
  const {t, i18n} = useTranslation();

  const ProfileList = React.useMemo(() => {
    return EditProfile(t, i18n);
  }, [t, i18n]);

  const userData = React.useMemo(() => {
    return getUserData();
  }, []);

  const [profileImage, setProfileImage] = React.useState<{[key: string]: any}>({
    uri: userData.userdata?.profile,
    name: '',
    type: '',
  });

  const userProfileUpdate = async (selectedImage: any) => {
    if (userData.resType == 'SUCCESS') {
      const userDataClone = JSON.parse(JSON.stringify(userData.userdata));
      userDataClone.profile = selectedImage;
      userDataClone.dob = CustomBackendDateSplitAndFormat(
        userDataClone.dob,
        '-',
        '/',
        'mm/dd/yyyy',
      );

      const userDataCloneObj = {...userDataClone};

      for (let i in userDataClone) {
        if (userDataCloneObj[i] === null || userDataCloneObj[i] === undefined) {
          delete userDataCloneObj[i];
        }
      }
      const response = await PersonalInfoSaveDetailsApi(userDataCloneObj);

      if (response.resType == 'SUCCESS') {
        const updatedReponse = await PersonalInfoGetDetailsApi();
        if (response.resType == 'SUCCESS') {
          const personalInfo = updatedReponse.data.personal_details;
          personalInfo.profile = `${BASE_URL}${personalInfo.profile}`;
          const updateResult = setUserData(personalInfo);
          if (updateResult == 'SUCCESS')
            Toast.show('Profile Image Updated Successfully', Toast.LONG);
        }
      } else {
        Toast.show(`Image Couldn't Get Updated`, Toast.LONG);
      }
      return response;
    }
  };

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

  const handleProfile = async (val: string) => {
    switch (val) {
      case 'gallery':
        let pathGallery = await chooseFile('photo');
        if (pathGallery) {
          userProfileUpdate({
            uri: pathGallery[0].uri,
            name: pathGallery[0].fileName,
            type: pathGallery[0].type,
          }).then(res => {
            if (res?.resType == 'SUCCESS') {
              setProfileImage({
                uri: pathGallery[0].uri,
                name: pathGallery[0].fileName,
                type: pathGallery[0].type,
              });
            }
          });
        }
        break;
      case 'camera':
        let pathCamera = await captureImage('photo');
        if (pathCamera) {
          userProfileUpdate({
            uri: pathCamera[0].uri,
            name: pathCamera[0].fileName,
            type: pathCamera[0].type,
          }).then(res => {
            if (res?.resType == 'SUCCESS') {
              setProfileImage({
                uri: pathCamera[0].uri,
                name: pathCamera[0].fileName,
                type: pathCamera[0].type,
              });
            }
          });
        }
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
          icon: AllIcons.NotificationOutline,
          onPress: () => {
            navigation.navigate('dailyUpdates');
          },
        }}
      />

      <ScrollView
        contentContainerStyle={[
          commonStyle.commonContentView,
          {paddingBottom: '25%'},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={style.imageContainer}>
          <View onTouchEnd={() => setProfileModel(true)}>
            <View style={{height: 64, width: 64}}>
              <Image
                source={
                  profileImage.uri != '' && !profileImage.uri.includes('null')
                    ? {uri: profileImage.uri}
                    : AllIcons.DummyAvtar
                }
                style={{height: '100%', width: '100%', borderRadius: 50}}
              />
            </View>
            <View style={style.pictureUpdateIcon}>
              <Image source={AllIcons.Camera} style={{height: 20, width: 20}} />
            </View>
          </View>
          <View style={{justifyContent: 'center', marginLeft: '5%'}}>
            <Text style={style.profileName}>{userData.userdata.full_name}</Text>
            <Text style={{color: 'rgba(23,23,23,0.5)'}}>
              {userData.userdata.primary_contact_cc?.toString().split('(')[0]}
              {userData.userdata.primary_contact}
            </Text>
            {/* <View style={style.familyIdView}>
              <Text style={style.familyIdText}>{t('myProfile.ID')}:148410</Text>
            </View> */}
          </View>
        </View>
        <View style={style.mapContainer}>
          {ProfileList.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
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
                <SecondaryButton
                  onPress={() => {
                    setModelVisible(!modelVisible);
                  }}
                  buttonColor="rgba(172, 43, 49, 0.02)"
                  borderColor="rgba(172,43,49,0.3)"
                  buttonStyle={style.modalbtn}
                  titleColor="black"
                  title={t('LogoutModel.CancelBtn')}
                />
                <PrimaryButton
                  onPress={
                    modalType === 'logout'
                      ? () => {
                          const resRemoveAuthToken = removeAuthToken();

                          if (resRemoveAuthToken === 'SUCCESS') {
                            navigation.replace('Auth');
                          }
                        }
                      : async () => {
                          const response = await DeleteMydataApi();

                          if (response.resType === 'SUCCESS') {
                            const resRemoveAuthToken = removeAuthToken();

                            if (resRemoveAuthToken === 'SUCCESS') {
                              navigation.replace('Auth');
                            }
                          }
                        }
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
        <DropDownModel
          modelVisible={profileModel}
          setModelVisible={setProfileModel}
          customModelchild={
            <View style={{justifyContent: 'center'}}>
              <Pressable
                onPress={() => {
                  handleProfile('gallery');
                }}
                style={{justifyContent: 'center'}}>
                <Text style={style.pictureUpdateText}>Upload From Gallery</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleProfile('camera');
                }}>
                <Text style={style.pictureUpdateText}>Take Photo</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setPhotoModel(!viewPhotoModel);
                }}>
                <Text style={style.pictureUpdateText}>View Photo</Text>
              </Pressable>
            </View>
          }
          type={'none'}
          modalHeight={'30%'}
        />
        <DropDownModel
          viewPhoto={true}
          modelVisible={viewPhotoModel}
          setModelVisible={setPhotoModel}
          customModelchild={
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 250,
                  width: 250,
                }}>
                <Image
                  source={
                    profileImage.uri != '' && !profileImage.uri.includes('null')
                      ? {uri: profileImage.uri}
                      : AllIcons.DummyAvtar
                  }
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 150,
                  }}
                />
              </View>
            </View>
          }
          type={'simple'}
          modalHeight={'40%'}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};
