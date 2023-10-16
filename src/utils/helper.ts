import {PermissionsAndroid, Platform} from 'react-native';
import {
  ImagePickerResponse,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';

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
  }
};

export const captureImage = async (type: MediaType) => {
  let isCameraPermitted = await requestCameraPermission();
  let mainuri: ImagePickerResponse;

  if (Platform.OS === 'android') {
    if (isCameraPermitted) {
      try {
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
              console.log('User cancelled camera picker');
            }
            if (response.errorCode == 'camera_unavailable') {
              console.log('Camera not available on device');
            }
            if (response.errorCode == 'permission') {
              console.log('Permission not satisfied');
            }
            if (response.errorCode == 'others') {
              console.log(`${response.errorMessage}`);
            }
          },
        );

        let finaluri: any = mainuri.assets;

        return finaluri;
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    try {
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
            console.log('User cancelled camera picker');
          }
          if (response.errorCode == 'camera_unavailable') {
            console.log('Camera not available on device');
          }
          if (response.errorCode == 'permission') {
            console.log('Permission not satisfied');
          }
          if (response.errorCode == 'others') {
            console.log(`${response.errorMessage}`);
          }
        },
      );

      let finaluri: any = mainuri.assets;

      return finaluri;
    } catch (error) {
      console.log(error);
    }
  }
};

export const chooseFile = async (type: MediaType) => {
  try {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
    };

    let mainuri: ImagePickerResponse;
    mainuri = await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      }
      if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      }
      if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      }
      if (response.errorCode == 'others') {
        console.log(`${response.errorMessage}`);
      }
    });

    let finaluri: any = mainuri.assets;

    return finaluri;
  } catch (error) {
    console.log(error);
  }
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
  if (date !== '' && date !== null && date !== undefined) {
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
  } else {
    return '';
  }
};

export const CustomBackendDateSplitAndFormat = (
  date: string,
  fromSplitParameter: string,
  toSplitParameter: string,
  format: 'mm/dd/yyyy' | 'dd/mm/yyyy',
) => {
  if (date !== '' && date !== null && date !== undefined) {
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
  } else {
    return '';
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

// export const CustomDateSplitAndFormat = (
//   date: string,
//   fromSplitParameter: string,
//   toSplitParameter: string,
//   format: 'mm/dd/yyyy' | 'dd/mm/yyyy',
// ) => {
//   if (format === 'mm/dd/yyyy') {
//     const newDate = `${
//       date.split(`${fromSplitParameter}`)[1]
//     }${toSplitParameter}${
//       date.split(`${fromSplitParameter}`)[0]
//     }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

//     return newDate;
//   }
//   if (format === 'dd/mm/yyyy') {
//     const newDate = `${
//       date.split(`${fromSplitParameter}`)[0]
//     }${toSplitParameter}${
//       date.split(`${fromSplitParameter}`)[1]
//     }${toSplitParameter}${date.split(`${fromSplitParameter}`)[2]}`;

//     return newDate;
//   }
// };
async function hasPermissions() {
  try {
    if (Platform.OS === 'android') {
      let deviceAPIVersion = Platform.Version;
      let granted = PermissionsAndroid.RESULTS.GRANTED;

      if (parseInt(deviceAPIVersion.toString()) >= 33) {
        return granted == PermissionsAndroid.RESULTS.GRANTED;
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } else {
      // Write code for ios permissions :--------
      return true;
    }
  } catch (error) {
    console.log('Check Permission Error For Music', error);
  }
}

// export const checkPermissionOfWritingStorage = async () => {
//   try {
//     let deviceVersionInfo = DeviceInfo.getSystemVersion();
//     let granted = PermissionsAndroid.RESULTS.GRANTED;

//     if (parseInt(deviceVersionInfo) >= 13) {
//       return granted == PermissionsAndroid.RESULTS.GRANTED;
//     } else {
//       granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );
//     }

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       return granted == PermissionsAndroid.RESULTS.GRANTED;
//     } else {
//       Toast.show('Storage Permission Required', 2);
//     }
//   } catch (error) {
//     console.log('Check Permission Error For Music', error);
//   }
// };

export const downloadSong = async (
  REMOTE_SONG_URL: string,
  songName: string,
) => {
  try {
    const permissionResponse = await hasPermissions();
    if (permissionResponse) {
      let resType: 'SUCCESS' | 'ERROR';
      let date = new Date();

      let song_URL = REMOTE_SONG_URL;

      let ext: any = song_URL && getExtention(song_URL);
      let songTitle = songName.split(' ').join('_');

      const {config, fs} = RNFetchBlob;

      const {MusicDir, DocumentDir} = fs.dirs;

      const aPath = Platform.select({
        ios: DocumentDir,
        android: MusicDir,
      });

      let fileName = `/Gurukul-Parivar/Musics/${songTitle}_${Math.floor(
        date.getTime() + date.getSeconds() / 2,
      )}${ext}`;

      const finalPath = aPath + fileName;

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
          fileCache: false,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: finalPath,
            description: 'Music',
          },
        },
      });

      if (options) {
        const response = await config(options).fetch('GET', song_URL);

        if (response) {
          return (resType = 'SUCCESS');
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          return (resType = 'ERROR');
          // Handle download failure
        }
      } else {
        return (resType = 'ERROR');
      }
    } else {
      Toast.show('Storage Permission Required', 2);
      return 'ERROR';
    }
  } catch (error: any) {
    console.log(error, 'Song Download');
    Toast.show(error.toString(), 2);
  }
};

const getExtention = (filename: string) => {
  // To get the file extension
  const parts = filename.split('.');
  return `.${parts[parts.length - 1]}`;
};
