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
  ProfileEdit: {formStep: number} | undefined;
};

export type RootBottomTabParamList = {
  Home: undefined;
  FrontDesk: undefined;
  Profile: undefined;
};

export type RootAuthStackParamList = {
  Login: undefined;
  Register: undefined;

  OTP: {primary_email: string} | undefined;
  Success: {type: 'Login' | 'Profile'} | undefined;

  ProfileSignup: undefined;
};

export type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginOtpScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'OTP'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginSuccessStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootAuthStackParamList, 'Success'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type ProfileSignupProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'ProfileSignup'
>;

export type ProfileSignupEditProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileEdit'
>;

export type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'editProfile'
>;
