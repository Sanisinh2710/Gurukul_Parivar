import {Alert, PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob, { RNFetchBlobFetchPolyfill } from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import {
  ImagePickerResponse,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // {
        //   title: 'Camera Permission',
        //   message: 'App needs camera permission',
        // },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const captureImage = async (type: MediaType) => {
  let isCameraPermitted = await requestCameraPermission();
  let mainuri: ImagePickerResponse;

  if (isCameraPermitted) {
    mainuri = await launchCamera(
      {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
        }
        if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
        }
        if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
        }
        if (response.errorCode == 'others') {
          Alert.alert(`${response.errorMessage}`);
        }
      },
    );
    let finaluri: any = mainuri.assets;

    return finaluri;
  }
};

export const chooseFile = async (type: MediaType) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
  };

  let mainuri: ImagePickerResponse;
  mainuri = await launchImageLibrary(options, response => {
    if (response.didCancel) {
      Alert.alert('User cancelled camera picker');
    }
    if (response.errorCode == 'camera_unavailable') {
      Alert.alert('Camera not available on device');
    }
    if (response.errorCode == 'permission') {
      Alert.alert('Permission not satisfied');
    }
    if (response.errorCode == 'others') {
      Alert.alert(`${response.errorMessage}`);
    }
  });

  let finaluri: any = mainuri.assets;

  return finaluri;
};

export const isStringArray = (object: any): object is Array<string> => {
  if (object.some((item: any) => typeof item === 'string') === true) {
    return true;
  } else {
    return false;
  }
};

export const isObjectArray = (object: any): object is Array<object> => {
  if (object.some((item: any) => typeof item === 'object') === true) {
    return true;
  } else {
    return false;
  }
};

export const isObject = (object: any): object is object => {
  if (typeof object === 'object') {
    return true;
  } else {
    return false;
  }
};

export const isString = (object: any): object is string => {
  if (typeof object === 'string') {
    return true;
  } else {
    return false;
  }
};

export const CustomLocalDateSplitAndFormat = (
  date: string,
  fromSplitParameter: string,
  toSplitParameter: string,
  format: 'mm/dd/yyyy' | 'dd/mm/yyyy',
) => {
  if (format === 'mm/dd/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[0]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

    return newDate;
  }
  if (format === 'dd/mm/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[0]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

    return newDate;
  }
};

export const CustomBackendDateSplitAndFormat = (
  date: string,
  fromSplitParameter: string,
  toSplitParameter: string,
  format: 'mm/dd/yyyy' | 'dd/mm/yyyy',
) => {
  if (format === 'mm/dd/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[2]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[0]}`;

    return newDate;
  }
  if (format === 'dd/mm/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[2]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[0]}`;

    return newDate;
  }
};

export function getYearsArray() {
  const years = [];

  const currentYear = new Date().getFullYear();
  const startYear = 1948;
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }

  let sort = years.sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });

  return sort;
}

export const CustomDateSplitAndFormat = (
  date: string,
  fromSplitParameter: string,
  toSplitParameter: string,
  format: 'mm/dd/yyyy' | 'dd/mm/yyyy',
) => {
  if (format === 'mm/dd/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[0]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

    return newDate;
  }
  if (format === 'dd/mm/yyyy') {
    const newDate = `${
      date.split(`${fromSplitParameter}`)[0]
    }${toSplitParameter}${
      date.split(`${fromSplitParameter}`)[1]
    }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

    return newDate;
  }
};

export const checkPermission = async () => {
  try {
    let deviceVersionInfo = DeviceInfo.getSystemVersion();
    let granted = PermissionsAndroid.RESULTS.GRANTED;

    if (parseInt(deviceVersionInfo) >= 13) {
      return granted == PermissionsAndroid.RESULTS.GRANTED;
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return granted == PermissionsAndroid.RESULTS.GRANTED;
    } else {
      Toast.show('Storage Permission Required', 2);
    }
  } catch (error) {
    console.log('Check Permission Error For Music', error);
  }
};

export const downloadSong = async (REMOTE_SONG_URL :string,songName:string) => {
  try{
    const permissionResponse = await checkPermission();
  if (permissionResponse) {
    let resType : 'SUCCESS' | 'ERROR';
    let date = new Date();
 
    let song_URL = REMOTE_SONG_URL;
  
    let ext: any = song_URL && getExtention(song_URL);
    console.log(ext);
    let songTitle =  songName.split(" ").join('_');
    console.log(song_URL);
  
    const {config, fs} = RNFetchBlob;
    let MusicDirc = fs.dirs.MusicDir;
    let fileName = `/${songTitle}_${Math.floor(date.getTime() + date.getSeconds() / 2)}${ext}`;
    
    let options = {
      fileCache: false, 
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
        MusicDirc + fileName,
        description: 'Music',
      },
    };
    
    const response = await RNFetchBlob.config(options).fetch('GET', song_URL);
    if (response) {
      return (resType = 'SUCCESS');
    } else {
      return (resType = 'ERROR');
      // Handle download failure
    }
  }
}
catch(error)
{
  console.log(error,"Song Download");
}
};
const getExtention = (filename: string) => {
  // To get the file extension
  const parts = filename.split('.');
  return `.${parts[parts.length - 1]}`;
};
