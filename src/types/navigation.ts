import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  BottomNavBar: undefined;
  dailyDarshan: undefined;
  dailyDarshanDetail: {
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
  programDetail: {title: string; description: string} | undefined;
  dailyQuiz: undefined;
  dailyQuizDetail: {id: number};
  donation: undefined;
  QuizResult: {marks: number};
  ProfileEdit: {formStep: number} | undefined;
  PaymentMethod: undefined;
  GurukulEvents: undefined;
  QuizHistory: {date: string; id: number};
};

export type RootBottomTabParamList = {
  Home: undefined;
  FrontDesk: undefined;
  Profile: undefined;
};

export type RootAuthStackParamList = {
  Login: undefined;
  Register: undefined;

  OTP: {primary_email: string; reset_pass?: boolean} | undefined;
  Success: {type: 'Login' | 'Profile' | 'Pass'} | undefined;

  ProfileSignup: undefined;
  ForgotPassword: undefined;
  ResetPassword:
    | {
        reset_pass?: boolean | undefined;
      }
    | undefined;
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

export type ForgotPasswordProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'ForgotPassword'
>;
export type ResetPasswordProps = NativeStackScreenProps<
  RootAuthStackParamList,
  'ResetPassword'
>;

export type DailyProgramProps = NativeStackScreenProps<
  RootStackParamList,
  'program'
>;

export type DailyProgramDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'programDetail'
>;
