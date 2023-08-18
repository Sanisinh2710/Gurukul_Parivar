import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  BottomNavBar: undefined;
  dailyDarshan: undefined;
  dailyDarshanDetail: {
    image: any;
    date: string;
    totalImages: number;
    data: String[];
    currentImageIndex: number;
  };
  dailyQuotes: undefined;
  dailyUpdates: undefined;
  dailyUpdateDetail: {title: string; data: any};
  calendar: undefined;
  liveSatsang: undefined;
  changeLanguage: undefined;
  editProfile: undefined;
  status: undefined;
  program: undefined;
  dailyQuiz: undefined;
  dailyQuizDetail: undefined;
  donation: undefined;
  QuizResult: {marks: number};
};

export type RootBottomTabParamList = {
  Home: undefined;
  FrontDesk: undefined;
  Profile: undefined;
};

export type RootAuthStackParamList = {
  MobileLogin: undefined;
  MobileLoginOTP: {mobileNum: string; countryCode: string} | undefined;
  LoginSuccess: {type: 'Login' | 'Profile'} | undefined;
  ProfileSignup: undefined;
};
export type LoginOtpScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'MobileLoginOTP'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginSuccessStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'LoginSuccess'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type ProfileSignupProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'ProfileSignup'
>;
