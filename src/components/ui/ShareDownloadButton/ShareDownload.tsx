import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';

import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import LottieView from 'lottie-react-native';
import {CommonStyle} from '../../../../assets/styles';
import {styles} from './style';
import {AllIcons} from '../../../../assets/icons';
import {DropDownModel} from '../Modal';
import {CustomFonts} from '../../../utils';
type ShareDownloadProps = {
  wallpaper: boolean;
};
export const ShareDownload = ({wallpaper}: ShareDownloadProps) => {
  const style = styles();
  const commonStyle = CommonStyle();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const onShare = async () => {
    try {
      const response = await RNFS.downloadFile({
        fromUrl:
          'https://e7.pngegg.com/pngimages/514/813/png-clipart-child-computer-icons-avatar-user-avatar-child-face.png',
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
        } else {
          downloadImage();
          setModalVisible(!modalVisible);
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
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

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