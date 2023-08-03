import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {CustomNavigate} from '../../../../components/ui/CustomNavigate/CustomNavigate';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import LottieView from 'lottie-react-native';
import {AllImages} from '../../../../../assets/images';

export const DailyDarshanDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyDarshanDetail'>) => {
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
        console.log('Share response:', shareResponse);
        // Handle successful share here
      } else {
        console.log('Error sharing:');
        // Handle error here
      }
    } catch (error) {
      console.log('Error sharing:', error);
      // Handle error here
    }
  };

  const REMOTE_IMAGE_PATH =
    'https://e7.pngegg.com/pngimages/514/813/png-clipart-child-computer-icons-avatar-user-avatar-child-face.png';
  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
        } else {
          // If permission denied then show alert
          downloadImage();
          setModalVisible(true);
          console.log('Denied');
          Toast.show('Storage Permission Required', 2);
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
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
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        // alert('Image Downloaded Successfully.');
      });
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
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        headerTitle={route.params.date}
      />
      {/* <View style={[commonStyle.commonContentView, {flex: 1}]}>
        <View style={{height: '80%', marginTop: '5%'}}>
          <Image source={route.params.image} style={style.images} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 15,
            marginTop: '5%',
          }}>
          <View
            onTouchEnd={onShare}
            style={[
              style.iconContainer,
              {backgroundColor: 'rgba(172, 168, 123, 1)'},
            ]}>
            <Image
              source={AllIcons.Share}
              style={[style.icon, {height: 22, width: 22}]}
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
      <CustomNavigate text="2/4" /> */}
      <DropDownModel
        customModelchild={
          <LottieView
            // style={{backgroundColor: 'red'}}
            progress={animationProgress.current}
            source={require('../../../../../assets/animation/downloadDone.json')}
          />
        }
        modalHeight="50%"
        setModelVisible={setModalVisible}
        type={'none'}
        modelVisible={true}
      />
    </ScreenWrapper>
  );
};
