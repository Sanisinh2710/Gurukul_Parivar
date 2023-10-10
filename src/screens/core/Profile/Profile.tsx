import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {
  DropDownModel,
  PrimaryButton,
  RoundedIcon,
  ScreenHeader,
  ScreenWrapper,
  SecondaryButton,
} from '@components';
import {BASE_URL} from '@env';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {REMOVE_USER_DATA, SET_USER_DATA} from '@redux/ducks/userSlice';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  DeleteMydataApi,
  PersonalInfoGetDetailsApi,
  PersonalInfoSaveDetailsApi,
  removeAuthToken,
} from '@services';
import {RootBottomTabParamList, RootStackParamList} from '@types';
import {
  COLORS,
  CustomBackendDateSplitAndFormat,
  EditProfileList,
  captureImage,
  chooseFile,
} from '@utils';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
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
  const style = styles();
  const commonStyle = CommonStyle();

  const {height} = Dimensions.get('screen');

  const userData = useAppSelector(state => state.currUser.currUser);
  const userRole = useAppSelector(state => state.currUser.userRole);

  const ProfileList = React.useMemo(() => {
    return EditProfileList(t, i18n, userRole);
  }, [t, i18n]);

  const dispatch = useAppDispatch();

  const [profileImage, setProfileImage] = React.useState<{
    [key: string]: any;
  }>({
    uri: userData?.profile ?? 'null',
    name: '',
    type: '',
  });

  const userProfileUpdate = async (selectedImage: any) => {
    if (userData) {
      const userDataClone = JSON.parse(JSON.stringify(userData));
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

      console.log(userDataCloneObj);

      if (response.resType == 'SUCCESS') {
        const updatedReponse = await PersonalInfoGetDetailsApi();
        if (response.resType == 'SUCCESS') {
          const personalInfo = updatedReponse.data.personal_details;
          personalInfo.profile = `${BASE_URL}${personalInfo.profile}`;

          dispatch(SET_USER_DATA({userData: personalInfo, role: 'USER'}));
          Toast.show('Profile Image Updated Successfully', Toast.LONG);
        }
      } else {
        Toast.show(`Image Couldn't Get Updated`, Toast.LONG);
      }
      return response;
    }
  };

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
              setProfileModel(false);
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
              setProfileModel(false);
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
          <View
            onTouchEnd={
              userRole === 'USER' ? () => setProfileModel(true) : () => {}
            }>
            <View style={style.imageView}>
              <Image
                source={
                  profileImage?.uri != '' &&
                  !profileImage?.uri?.includes('null')
                    ? {uri: profileImage?.uri}
                    : AllIcons.DummyAvtar
                }
                style={style.imageStyle}
              />
            </View>
            {userRole === 'USER' && (
              <View style={style.pictureUpdateIconView}>
                <Image
                  source={AllIcons.Camera}
                  style={style.pictureUpdateIcon}
                />
              </View>
            )}
          </View>
          <View style={style.userNameView}>
            <Text style={style.profileName}>
              {userRole === 'GUEST'
                ? 'GUEST USER'
                : userData?.full_name ?? 'YOUR NAME'}
            </Text>
            <Text style={style.textColor}>
              {userData?.primary_contact
                ? userData?.primary_contact_cc?.toString().split('(')[0]
                : ''}
              {userData?.primary_contact}
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
                  <View style={style.flatlistNameView}>
                    <Text style={style.listName}>{item.name} </Text>
                  </View>
                  <View style={style.languageContainer}>
                    <Text style={style.langText}>{item.language}</Text>
                  </View>
                  <View style={style.rightIcon}>
                    {item.rightIcon && (
                      <Image source={item.rightIcon} style={style.arrow} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <PrimaryButton
          title={
            userRole === 'GUEST' ? t('common.Signin') : t('DeleteModel.DltBtn')
          }
          onPress={() => {
            if (userRole === 'GUEST') {
              dispatch(REMOVE_USER_DATA({wantToRemove: true}));
              const resRemoveAuthToken = removeAuthToken();

              if (resRemoveAuthToken === 'SUCCESS') {
                navigation.replace('Auth');
              }
            } else {
              setModelType('deleteAcc');
              setModelVisible(!modelVisible);
            }
          }}
          buttonColor={'rgba(172, 43, 49, 0.1)'}
          titleColor={COLORS.primaryColor}
          buttonStyle={style.btnStyle}
          textStyle={{fontSize: 16}}
        />
        <DropDownModel
          type={'none'}
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          modalHeight={`${
            Platform.OS === 'ios'
              ? height > 700
                ? height * 0.052
                : height * 0.078
              : 47
          }%`}
          customModelchild={
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                marginTop: '5%',
              }}
              onTouchEnd={e => e.stopPropagation()}>
              <View style={style.linearGradientContainer}>
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
                            dispatch(REMOVE_USER_DATA({wantToRemove: true}));
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
            </ScrollView>
          }
        />
        <DropDownModel
          isCamera={true}
          modelVisible={profileModel}
          setModelVisible={setProfileModel}
          customModelchild={
            <View style={style.modelOption}>
              <Pressable
                onPress={() => {
                  handleProfile('gallery');
                }}
                style={style.modelOption}>
                <Text style={style.pictureUpdateText}>Upload From Gallery</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleProfile('camera');
                }}>
                <Text style={style.pictureUpdateText}>Capture your Photo</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setProfileModel(false);
                  setPhotoModel(true);
                }}>
                <Text style={style.pictureUpdateText}>View Photo</Text>
              </Pressable>
            </View>
          }
          type={'none'}
          modalHeight={`${
            Platform.OS === 'ios'
              ? height > 700
                ? height * 0.04
                : height * 0.055
              : height > 700
              ? height * 0.04
              : height * 0.055
          }%`}
        />
        <DropDownModel
          viewPhoto={true}
          modelVisible={viewPhotoModel}
          setModelVisible={setPhotoModel}
          customModelchild={
            <View style={style.dropDownView}>
              <View style={style.dropDownImageContainer}>
                <Image
                  source={
                    profileImage?.uri != '' &&
                    !profileImage?.uri?.includes('null')
                      ? {uri: profileImage?.uri}
                      : AllIcons.DummyAvtar
                  }
                  style={style.dropDownImage}
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
