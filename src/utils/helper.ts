import {Alert, PermissionsAndroid, Platform} from 'react-native';
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
    let finaluri: {uri: string | undefined} = {uri: mainuri.assets?.[0].uri};

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
