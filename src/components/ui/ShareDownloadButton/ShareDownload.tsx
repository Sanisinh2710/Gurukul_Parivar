import React from 'react';
import {
  ActivityIndicator,
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
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {COLORS, CustomFonts} from '../../../utils';
import {DropDownModel} from '../Modal';
import {styles} from './style';

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

  const [isSharing, setIsSharing] = React.useState(false);

  const [isDownloading, setIsdownloading] = React.useState(false);

  const animationProgress = React.useRef(new Animated.Value(0));

  const [modalForWallpaper, setModalForWallpaper] =
    React.useState<boolean>(false);

  const REMOTE_IMAGE_PATH = React.useMemo(() => {
    return imgURL;
  }, [imgURL]);

  const onShare = async () => {
    setIsSharing(true);
    try {
      const response = await RNFS.downloadFile({
        fromUrl: REMOTE_IMAGE_PATH!,
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

        setIsSharing(false);

        const shareRes = await Share.open(options);
        // Handle successful share here
      } else {
        // Handle error here
      }
      setIsSharing(false);
    } catch (error) {
      setIsSharing(false);

      // Handle error here
      console.log(error);
    }
  };

  const checkPermissionOfWritingStorage = async () => {
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

  const downloadImage = async () => {
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

    const response = await config(options).fetch('GET', image_URL);
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

  const settingWallPap = async (mode: 'HOME' | 'LOCK' | 'BOTH') => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const result = await WallpaperModule.setAsWallpaper(
          REMOTE_IMAGE_PATH,
          mode,
        );
        resolve(result);
      }, 1500);
    });
  };

  const setWallPaper = async (mode: 'HOME' | 'LOCK' | 'BOTH') => {
    setIsdownloading(true);
    let resultFetched: boolean = false;
    try {
      const result = await settingWallPap(mode);
      resultFetched = true;

      if (result === 'SUCCESS') {
        Toast.show('Wallpaper set successfully..!', Toast.LONG);
      }
    } catch (error) {
      console.log(error, 'wallpaper error');
    }
    if (resultFetched) {
      setTimeout(() => {
        setIsdownloading(false);
      }, 1500);
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
              onTouchEnd={() => setModalForWallpaper(!modalForWallpaper)}
              style={[
                style.iconContainer,
                {backgroundColor: 'rgba(98, 177, 158, 1)'},
              ]}>
              <>
                {isDownloading ? (
                  <ActivityIndicator
                    size={25}
                    color={COLORS.darkModetextColor}
                  />
                ) : (
                  <Image
                    source={AllIcons.SetWallPaper}
                    style={[style.icon, {height: 24, width: 24}]}
                  />
                )}
              </>
            </View>
          )}
          <View
            onTouchEnd={
              isSharing === false
                ? async () => {
                    await onShare();
                  }
                : () => {}
            }
            style={[
              style.iconContainer,
              {backgroundColor: 'rgba(172, 168, 123, 1)'},
            ]}>
            <>
              {isSharing ? (
                <ActivityIndicator size={25} color={COLORS.darkModetextColor} />
              ) : (
                <Image
                  source={AllIcons.Share}
                  style={[style.icon, {height: 18, width: 18}]}
                />
              )}
            </>
          </View>
          <View
            onTouchEnd={checkPermissionOfWritingStorage}
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
            <View>
              <LottieView
                style={{height: '80%', alignSelf: 'center'}}
                progress={animationProgress.current}
                source={require('../../../../assets/animation/downloadDone.json')}
              />
            </View>
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
              onPress={
                isDownloading
                  ? () => {}
                  : async () => {
                      await setWallPaper('HOME');
                    }
              }>
              <Text style={style.wallpaperText}>Set as a Home screen</Text>
            </Pressable>
            <Pressable
              onPress={
                isDownloading
                  ? () => {}
                  : async () => {
                      await setWallPaper('LOCK');
                    }
              }>
              <Text style={style.wallpaperText}>Set as a Lock screen</Text>
            </Pressable>
            <Pressable
              onPress={
                isDownloading
                  ? () => {}
                  : async () => {
                      await setWallPaper('BOTH');
                    }
              }>
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
