import React from 'react';
import {
  Animated,
  Easing,
  Image,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {CustomFonts} from '../../../utils';
import {DropDownModel} from '../Modal';
import {styles} from './style';
import {useTranslation} from 'react-i18next';

type ShareDownloadProps = {
  imgURL: string | undefined;
  wallpaper: boolean;
};
export const ShareDownload = ({wallpaper, imgURL}: ShareDownloadProps) => {
  const {WallpaperModule} = NativeModules;
  const {t} = useTranslation();
  const style = styles();
  const commonStyle = CommonStyle();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalForWallpaper, setModalForWallpaper] =
    React.useState<boolean>(false);

  const animationProgress = React.useRef(new Animated.Value(0));
  const onShare = async () => {
    try {
      const response = await RNFS.downloadFile({
        fromUrl: imgURL!,
        toFile: `${RNFS.DocumentDirectoryPath}/tempImage.jpg`,
      });
      if ((await response.promise).statusCode === 200) {
        const imagePath = `${RNFS.DocumentDirectoryPath}/tempImage.jpg`;
        const fileContent = await RNFS.readFile(imagePath, 'base64');
        const base64Image = `data:image/jpeg;base64,${fileContent}`;

        const options = {
          title: 'Share via',
          message: 'Check out this awesome app!',
          url: base64Image,
          subject: 'Share Link', // for email
        };

        await Share.open(options);
        // Handle successful share here
        console.log(Share.open(options));
      } else {
        // Handle error here
      }
    } catch (error) {
      // Handle error here
    }
  };

  const REMOTE_IMAGE_PATH = imgURL;
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        let deviceVersion = DeviceInfo.getSystemVersion();
        let granted = PermissionsAndroid.RESULTS.DENIED;
        if (parseInt(deviceVersion) >= 13) {
          granted = PermissionsAndroid.RESULTS.GRANTED;
        } else {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
        }

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
          setModalVisible(!modalVisible);
        } else {
          Toast.show('Storage Permission Required', 2);
        }
      } catch (err) {}
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext: any = image_URL && getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    image_URL &&
      config(options)
        .fetch('GET', image_URL)
        .then(res => {});
  };

  const getExtention = (filename: string) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  React.useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: modalVisible ? 1 : 0,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [modalVisible]);
  const handleWallpaperMode = async (mode: string) => {
    await setWallPaper(imgURL ? imgURL : 'wallpaperImage', `${mode}`);
  };

  const setWallPaper = async (imgUrl: string, mode: string) => {
    try {
      const result = await WallpaperModule.setAsWallpaper(imgUrl, mode);
      if (result === 'SUCCESS') {
        Toast.show('Wallpaper set successfully..!', Toast.LONG);
      }
    } catch (error) {
      console.log(error, 'wallpaper error');
    }
  };

  return (
    <>
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 15,
            marginTop: '5%',
          }}>
          {wallpaper === true && (
            <View
              onTouchEnd={() => {
                setModalForWallpaper(!modalForWallpaper);
              }}
              style={[
                style.iconContainer,
                {backgroundColor: 'rgba(98, 177, 158, 1)'},
              ]}>
              <Image
                source={AllIcons.SetWallPaper}
                style={[style.icon, {height: 24, width: 24}]}
              />
            </View>
          )}
          <View
            onTouchEnd={onShare}
            style={[
              style.iconContainer,
              {backgroundColor: 'rgba(172, 168, 123, 1)'},
            ]}>
            <Image
              source={AllIcons.Share}
              style={[style.icon, {height: 18, width: 18}]}
            />
          </View>
          <View
            onTouchEnd={checkPermission}
            style={[
              style.iconContainer,
              {backgroundColor: 'rgba(174, 73, 141, 1)'},
            ]}>
            <Image source={AllIcons.Download} style={style.icon} />
          </View>
        </View>
      </View>

      <DropDownModel
        customModelchild={
          <>
            <LottieView
              style={{height: '80%', alignSelf: 'center'}}
              progress={animationProgress.current}
              source={require('../../../../assets/animation/downloadDone.json')}
            />
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 80,
              }}>
              <Text
                style={{
                  ...CustomFonts.header.medium20,
                  fontSize: 20,
                  color: 'rgba(23,23,23,0.7)',
                }}>
                {t('DailyDarshanDetail.SuccessfulDownload')}
              </Text>
              <Text
                style={{
                  ...CustomFonts.header.medium20,
                  fontSize: 18,
                  color: 'rgba(23,23,23,0.7)',
                }}>
                {t('DailyDarshanDetail.GhanshyamMaharaj')}
              </Text>
              <Text
                style={{
                  ...CustomFonts.header.small18,
                  color: 'rgba(23,23,23,0.7)',
                }}>
                {t('DailyDarshanDetail.Subtext')}
              </Text>
            </View>
          </>
        }
        modalHeight="50%"
        setModelVisible={setModalVisible}
        type={'none'}
        modelVisible={modalVisible}
      />
      <DropDownModel
        customModelchild={
          <>
            <Pressable
              onPress={() => {
                handleWallpaperMode('HOME');
              }}>
              <Text style={style.wallpaperText}>Set as a Home screen</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleWallpaperMode('LOCK');
              }}>
              <Text style={style.wallpaperText}>Set as a Lock screen</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleWallpaperMode('BOTH');
              }}>
              <Text style={style.wallpaperText}>Both</Text>
            </Pressable>
          </>
        }
        modalHeight="30%"
        setModelVisible={setModalForWallpaper}
        type={'none'}
        modelVisible={modalForWallpaper}
      />
    </>
  );
};
