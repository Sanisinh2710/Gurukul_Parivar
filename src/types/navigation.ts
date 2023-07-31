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
export type RootBottomStack1List = {
  homeScreen: undefined;
  PrimaryBottomStack1: undefined;
};
// export type RootBottomStack2List = {
//   homeScreen: undefined;
//   frontDesk: undefined;
//   profileScreen: undefined;
// };
// export type RootBottomStack3List = {
//   homeScreen: undefined;
//   frontDesk: undefined;
//   profileScreen: undefined;
// };
export type RootPrimaryStack1 = {
  dailyDarshan: undefined;
  dailyUpdates: undefined;
  dailyQuotes: undefined;
  calendar: undefined;
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
export type PrimaryStack1ScreenProps = NativeStackScreenProps<
  RootPrimaryStack1,
  'dailyDarshan'
>;
