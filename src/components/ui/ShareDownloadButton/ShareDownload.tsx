import React from 'react';
import {
  Animated,
  Easing,
  Image,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {CustomFonts} from '../../../utils';
import {DropDownModel} from '../Modal';
import {styles} from './style';

type ShareDownloadProps = {
  wallpaper: boolean;
};

export const ShareDownload = ({wallpaper}: ShareDownloadProps) => {
  const {WallpaperModule} = NativeModules;

  const style = styles();
  const commonStyle = CommonStyle();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const animationProgress = React.useRef(new Animated.Value(0));

  const onShare = async () => {
    try {
      const response = await RNFS.downloadFile({
        fromUrl:
          'https://e7.pngegg.com/pngimages/514/813/png-clipart-child-computer-icons-avatar-user-avatar-child-face.png',
        toFile: `${RNFS.DownloadDirectoryPath}/tempImage.jpg`,
      });

      if ((await response.promise).statusCode === 200) {
        const imagePath = `${RNFS.DownloadDirectoryPath}/tempImage.jpg`;
        const fileContent = await RNFS.readFile(imagePath, 'base64');
        const base64Image = `data:image/jpeg;base64,${fileContent}`;
        console.log(imagePath, ' ', fileContent, '   ', base64Image);

        const options = {
          title: 'Share via',
          message: 'Check out this awesome app!',
          url: base64Image,
          subject: 'Share Link', // for email
        };

        const shareResponse = await Share.open(options);
        // Handle successful share here
      } else {
        // Handle error here
      }
    } catch (error) {
      // Handle error here
    }
  };

  const REMOTE_IMAGE_PATH =
    'https://e7.pngegg.com/pngimages/514/813/png-clipart-child-computer-icons-avatar-user-avatar-child-face.png';
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
          setModalVisible(!modalVisible);
          Toast.show('Storage Permission Required', 2);
        } else {
          // downloadImage();
          // setModalVisible(!modalVisible);
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
    let ext: any = getExtention(image_URL);
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

  const imgURL = `https://img.freepik.com/premium-photo/ready-serve-shot-tennis-ball-lying-court-outlined-by-shadow-racket_590464-5276.jpg?t=st=1691665426~exp=1691666026~hmac=341c3bea3f1ebe4b4692743aec138eb64cf2773345d6c34d2305cad8a471c81e`;

  const setWallPaper = async (imgUrl: string) => {
    try {
      const result = await WallpaperModule.setAsWallpaper(imgUrl);
      console.log(result);
    } catch (error) {
      console.log(error);
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
              onTouchEnd={async () => {
                await setWallPaper(imgURL);
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
                bottom: 60,
              }}>
              <Text style={{...CustomFonts.header.medium20, fontSize: 18}}>
                Ghanshyam Maharaj
              </Text>
              <Text style={{...CustomFonts.header.small18}}>
                Practice remembering today's darshan.
              </Text>
            </View>
          </>
        }
        modalHeight="50%"
        setModelVisible={setModalVisible}
        type={'none'}
        modelVisible={modalVisible}
      />
    </>
  );
};
