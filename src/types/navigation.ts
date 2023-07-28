import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  BottomNavBar: undefined;
};

export type RootBottomTabParamList = {
  homeScreen: undefined;
  frontDesk: undefined;
  profileScreen: undefined;
};
export type RootAuthStackParamList = {
  MobileLogin: undefined;
  MobileLoginOTP: undefined;
  LoginSuccess: undefined;
  UploadPhoto: undefined;
};
export type LoginOtpScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'MobileLoginOTP'
>;
export type UploadPhotoScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'UploadPhoto'
>;

export type LoginSuccessStackScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'LoginSuccess'
>;
