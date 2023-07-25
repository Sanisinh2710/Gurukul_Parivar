import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import {ScreenHeader} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import CustomButton from '../../../../components/ui/Buttons/Button';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {captureImage, chooseFile} from '../../../../utils/helper';

const data = [
  {item: 'hello'},
  {item: 'jsid'},
  {item: 'hiii'},
  {item: 'sdgzsd'},
];
export const UploadPhoto = () => {
  const {t, i18n} = useTranslation();
  const commonStyle = CommonStyle();
  const style = styles();

  const [filePath, setFilePath] = useState<{uri: string | undefined}>({
    uri: '',
  });

  const [selectedItem, setselectedItem] = useState('');

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         // {
  //         //   title: 'Camera Permission',
  //         //   message: 'App needs camera permission',
  //         // },
  //       );
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else return true;
  // };

  // const captureImage = async (type: MediaType) => {
  //   let isCameraPermitted = await requestCameraPermission();
  //   if (isCameraPermitted) {
  //     launchCamera(
  //       {
  //         mediaType: type,
  //         maxWidth: 300,
  //         maxHeight: 550,
  //         quality: 1,
  //         videoQuality: 'low',
  //         durationLimit: 30, //Video max duration in seconds
  //         saveToPhotos: true,
  //       },
  //       response => {
  //         console.log('Response = ', response);

  //         if (response.didCancel) {
  //           Alert.alert('User cancelled camera picker');
  //           return;
  //         } else if (response.errorCode == 'camera_unavailable') {
  //           Alert.alert('Camera not available on device');
  //           return;
  //         } else if (response.errorCode == 'permission') {
  //           Alert.alert('Permission not satisfied');
  //           return;
  //         } else if (response.errorCode == 'others') {
  //           Alert.alert(`${response.errorMessage}`);
  //           return;
  //         } else {
  //           const uri = {uri: response.assets?.[0].uri};
  //           if (uri.uri !== undefined) {
  //             setFilePath(uri);
  //           }
  //         }
  //       },
  //     );
  //   }
  // };

  // const chooseFile = (type: MediaType) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       Alert.alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       Alert.alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       Alert.alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       Alert.alert(`${response.errorMessage}`);

  //       return;
  //     } else {
  //       const uri = {uri: response.assets?.[0].uri};
  //       if (uri.uri !== undefined) {
  //         setFilePath(uri);
  //       }
  //     }
  //   });
  // };

  return (
    <SafeAreaView style={commonStyle.container}>
      <ScreenHeader
        theme={undefined}
        showLeft={true}
        headerTitle={t('uploadPhoto:HederText')}
        headerTitleAlign="center"
      />
      <View style={commonStyle.contentView}>
        <View style={style.FirstSubtitleView}>
          <Text style={style.FirstSubtitle}>
            {t('uploadPhoto:FirstSubtitle')}
          </Text>
          <Text style={style.SecondSubtitle}>
            {t('uploadPhoto:SecondSubtitle')}
          </Text>
        </View>
        <View
          style={style.photoMainView}
          onTouchEnd={() => {
            Alert.alert('Select Image', 'From', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'From Gallery',
                onPress: async () => {
                  let path = await chooseFile('photo');
                  console.log(path, 'path');

                  setFilePath(path);
                },
              },
              {
                text: 'Capture Photo',
                onPress: async () => {
                  let path = await captureImage('photo');
                  if (path) {
                    setFilePath(path);
                  }
                },
              },
            ]);
          }}>
          <View style={style.photOutSideView}>
            <View style={style.photoView}>
              {filePath.uri !== '' ? (
                <Image source={{uri: filePath.uri}} style={style.image} />
              ) : (
                <Image
                  source={require('../../../../../assets/images/avtar.png')}
                  style={style.avtar}
                />
              )}
            </View>
          </View>
          <Text style={style.photoBottomText}>
            {t('uploadPhoto:PickPhotoBTN')}
          </Text>
        </View>
        <View style={style.BottomView}>
          <Text style={style.BottomSubtitle1}>
            {t('uploadPhoto:BottomSubtitle1')}
          </Text>
          <Text style={style.BottomSubtitle2}>
            {t('uploadPhoto:BottomSubtitle2')}
          </Text>
          <Text style={style.DropdownTitle}>
            {t('uploadPhoto:DropdownTitle')}
          </Text>
          <View>
            <Dropdown
              dataObject={data}
              selectedItem={selectedItem}
              setselectedItem={setselectedItem}
              placeholder={'Select gurukul branch'}
            />
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          title={t('uploadPhoto:NextBtn')}
          onPress={undefined}
          buttonColor={''}
          titleColor={''}
          buttonStyle={style.NextBtn}
          textStyle={{}}
        />
      </View>
    </SafeAreaView>
  );
};
