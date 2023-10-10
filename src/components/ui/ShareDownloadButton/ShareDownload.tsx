import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import {AllIcons, CommonStyle} from '@assets';
import {DropDownModel} from '@components';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {COLORS, CustomFonts} from '@utils';
import LottieView from 'lottie-react-native';
import {useTranslation} from 'react-i18next';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
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

  const [isDownLoadingForWallPaper, setIsdownloadingforWallpaper] =
    React.useState(false);

  const [isDownLoading, setIsdownloading] = React.useState(false);

  const animationProgress = React.useRef(new Animated.Value(0));

  const {height} = Dimensions.get('window');

  const [modalForWallpaper, setModalForWallpaper] =
    React.useState<boolean>(false);

  const REMOTE_IMAGE_PATH = React.useMemo(() => {
    return imgURL;
  }, [imgURL]);

  const onShare = async () => {
    setIsSharing(true);
    try {
      const granted =
        Platform.OS === 'android' ? await hasAndroidPermission() : true;

      if (granted) {
        const sharedPath = await downloadImage(true);

        const {fs} = RNFetchBlob;

        const imagePath = sharedPath;
        if (imagePath) {
          const fileContent = await fs.readFile(imagePath, 'base64');
          const base64Image = `data:image/jpeg;base64,${fileContent}`;

          const options = {
            title: 'Share via',
            ...(Platform.OS === 'android'
              ? {message: 'Jay Swaminarayana..!'}
              : {}),
            url: Platform.OS === 'android' ? base64Image : imagePath,
            subject: 'Share Link', // for email
          };

          setIsSharing(false);

          await Share.open(options);
        }
      } else {
        setIsSharing(false);
        Toast.show('Storage Permission Required', 2);
      }
    } catch (error) {
      setIsSharing(false);

      console.log(error);
    }
  };

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = async () => {
      if (parseInt(Platform.Version.toString()) >= 33) {
        const [hasReadMediaImagesPermission] = await Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
        ]);

        return hasReadMediaImagesPermission;
      } else {
        const [
          hasReadExternalStoragePermission,
          hasWriteExternalStoragePermission,
        ] = await Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ),
        ]);

        return (
          hasReadExternalStoragePermission && hasWriteExternalStoragePermission
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    } else {
      const getRequestPermissionPromise = async () => {
        if (parseInt(Platform.Version.toString()) >= 33) {
          const statuses = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ]);
          return (
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED
          );
        } else {
          const statuses = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);

          return (
            statuses[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
              PermissionsAndroid.RESULTS.GRANTED
          );
        }
      };
      const requestedStatus = await getRequestPermissionPromise();

      return requestedStatus;
    }
  }

  const checkPermissionOfWritingStorage = async () => {
    setIsdownloading(true);
    if (Platform.OS === 'ios') {
      // Implement Downloading logic for photos on ios:-----------------------
      try {
        await CameraRoll.save(REMOTE_IMAGE_PATH!);
        setModalVisible(!modalVisible);
      } catch (err) {
        Toast.show('Download could not happen..', 2);
      }
    } else {
      try {
        // let deviceVersion = DeviceInfo.getSystemVersion();
        const granted = await hasAndroidPermission();

        // if (parseInt(deviceVersion) >= 13) {
        //   granted = PermissionsAndroid.RESULTS.GRANTED;
        // } else {
        //   granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //   );
        // }

        if (granted) {
          await downloadImage();
          setModalVisible(!modalVisible);
        } else {
          Toast.show('Storage Permission Required', 2);
        }
      } catch (err) {}
    }
    setIsdownloading(false);
  };

  const downloadImage = async (wantPath?: boolean) => {
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
    const {PictureDir, DocumentDir} = fs.dirs;

    const aPath = Platform.select({
      ios: DocumentDir,
      android: PictureDir,
    });

    const finalPath =
      aPath +
      '/Gurukul-Parivar/Pictures/images_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ext;

    let options = Platform.select({
      ios: {
        fileCache: true,
        path: finalPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: true,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: wantPath ? false : true,
          path: finalPath,
          description: 'Image',
        },
      },
    });

    if (options && image_URL) {
      const response = await config(options).fetch('GET', image_URL);
      if (Platform.OS === 'ios') {
        await CameraRoll.save(response.data, {type: 'auto'});
      }
      if (wantPath) {
        return finalPath;
      }
    }
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

  const setWallPaper = async (mode: 'HOME' | 'LOCK' | 'BOTH') => {
    setIsdownloadingforWallpaper(true);
    let resultFetched: boolean = false;
    try {
      const result = await new Promise(resolve => {
        const myresult = WallpaperModule.setAsWallpaper(
          REMOTE_IMAGE_PATH,
          mode,
        );
        resolve(myresult);
      });
      resultFetched = true;

      if (result === 'SUCCESS') {
        Toast.show('Wallpaper set successfully..!', Toast.LONG);
      }
    } catch (error: any) {
      resultFetched = true;
      Toast.show(error.toString(), Toast.LONG);
    }
    if (resultFetched) {
      setIsdownloadingforWallpaper(false);
    }
  };

  return (
    <>
      <View style={[commonStyle.commonContentView]}>
        <View style={style.container}>
          {wallpaper === true && (
            <View
              onTouchEnd={
                isDownLoadingForWallPaper
                  ? () => {}
                  : () => setModalForWallpaper(!modalForWallpaper)
              }
              style={[
                style.iconContainer,
                {backgroundColor: 'rgba(98, 177, 158, 1)'},
              ]}>
              <>
                {isDownLoadingForWallPaper ? (
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
            onTouchEnd={
              isDownLoading
                ? () => {}
                : async () => await checkPermissionOfWritingStorage()
            }
            style={[
              style.iconContainer,
              {backgroundColor: 'rgba(174, 73, 141, 1)'},
            ]}>
            <>
              {isDownLoading ? (
                <ActivityIndicator size={25} color={COLORS.darkModetextColor} />
              ) : (
                <Image source={AllIcons.Download} style={style.icon} />
              )}
            </>
          </View>
        </View>
      </View>

      <DropDownModel
        customModelchild={
          <>
            <View>
              <LottieView
                style={{
                  height: height * 0.29,
                  alignSelf: 'center',
                }}
                progress={animationProgress.current}
                source={require('../../../../assets/animation/downloadDone.json')}
              />
            </View>
            <View style={style.successFullTextView}>
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
        modalHeight={`35%`}
        customModelchild={
          <>
            <Pressable
              onPress={
                isDownLoadingForWallPaper
                  ? e => {}
                  : e => {
                      setWallPaper('HOME');
                    }
              }>
              <Text style={style.wallpaperText}>Set as a Home screen</Text>
            </Pressable>
            <Pressable
              onPress={
                isDownLoadingForWallPaper
                  ? e => {}
                  : e => {
                      setWallPaper('LOCK');
                    }
              }>
              <Text style={style.wallpaperText}>Set as a Lock screen</Text>
            </Pressable>
            <Pressable
              onPress={
                isDownLoadingForWallPaper
                  ? e => {}
                  : async e => {
                      await setWallPaper('BOTH');
                    }
              }>
              <Text style={style.wallpaperText}>Both</Text>
            </Pressable>
          </>
        }
        setModelVisible={setModalForWallpaper}
        type={'none'}
        modelVisible={modalForWallpaper}
      />
    </>
  );
};
