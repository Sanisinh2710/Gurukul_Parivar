import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  BottomNavBar: undefined;
  dailyDarshan: undefined;
  dailyQuotes: undefined;
  dailyUpdates: undefined;
  calendar: undefined;
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
  ProfileSignup: undefined;
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
