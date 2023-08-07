import {CompositeScreenProps} from '@react-navigation/native';
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
  Home: undefined;
  FrontDesk: undefined;
  Profile: undefined;
};

export type RootAuthStackParamList = {
  MobileLogin: undefined;
  MobileLoginOTP: undefined;
  LoginSuccess: {type: 'Login' | 'Profile'} | undefined;
  ProfileSignup: undefined;
};
export type LoginOtpScreenProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'MobileLoginOTP'
>;

export type LoginSuccessStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'LoginSuccess'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type ProfileSignupProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'ProfileSignup'
>;
