import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  BottomNavBar: undefined;
};

export type RootAuthStackParamList = {
  MobileLogin: undefined;
  MobileLoginOTP: undefined;
  LoginSuccess: undefined;
};
export type LoginOtpScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'MobileLoginOTP'
>;
