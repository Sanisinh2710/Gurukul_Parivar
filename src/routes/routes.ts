import {ImageZoomer} from '@components';
import {
  CalendarScreen,
  ChangeLanguage,
  DailyDarshan,
  DailyDarshanDetail,
  DailyProgram,
  DailyProgramDetail,
  DailyQuiz,
  DailyQuizDetail,
  DailyQuotes,
  DailyUpdateDetail,
  DailyUpdates,
  DonationScreen,
  EditProfile,
  ForgotPassword,
  FrontDeskScreen,
  GurukulConnect,
  GurukulEvents,
  HomeScreen,
  LiveSatsang,
  LoginOTP,
  LoginScreen,
  LoginSuccess,
  PaymentMethod,
  ProfileScreen,
  ProfileSignup,
  ProfileSignupWithEdit,
  QuizHistory,
  QuizResult,
  RegisterScreen,
  ResetPassword,
  Status,
} from '@screens';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '@types';
import {AuthStackNavigator, BottomTabNavigator} from './Routes';

export const NativeStackRouteList: Array<{
  name: keyof RootStackParamList;
  component: (...event: any) => React.JSX.Element;
}> = [
  {
    name: 'Auth',
    component: AuthStackNavigator,
  },
  {
    name: 'BottomNavBar',
    component: BottomTabNavigator,
  },
  {
    name: 'GurukulConnect',
    component: GurukulConnect,
  },
  {
    name: 'GurukulEvents',
    component: GurukulEvents,
  },
  {
    name: 'PaymentMethod',
    component: PaymentMethod,
  },
  {
    name: 'ProfileEdit',
    component: ProfileSignupWithEdit,
  },
  {
    name: 'QuizHistory',
    component: QuizHistory,
  },
  {
    name: 'QuizResult',
    component: QuizResult,
  },
  {
    name: 'calendar',
    component: CalendarScreen,
  },
  {
    name: 'changeLanguage',
    component: ChangeLanguage,
  },
  {
    name: 'dailyDarshan',
    component: DailyDarshan,
  },
  {
    name: 'dailyDarshanDetail',
    component: DailyDarshanDetail,
  },
  {
    name: 'dailyQuiz',
    component: DailyQuiz,
  },
  {
    name: 'dailyQuizDetail',
    component: DailyQuizDetail,
  },
  {
    name: 'dailyQuotes',
    component: DailyQuotes,
  },
  {
    name: 'dailyUpdateDetail',
    component: DailyUpdateDetail,
  },
  {
    name: 'dailyUpdates',
    component: DailyUpdates,
  },
  {
    name: 'donation',
    component: DonationScreen,
  },
  {
    name: 'editProfile',
    component: EditProfile,
  },
  {
    name: 'liveSatsang',
    component: LiveSatsang,
  },
  {
    name: 'program',
    component: DailyProgram,
  },
  {
    name: 'programDetail',
    component: DailyProgramDetail,
  },
  {
    name: 'status',
    component: Status,
  },
  {
    name: 'ImageZommer',
    component: ImageZoomer,
  },
];

export const NativeAuthStackRouteList: Array<{
  name: keyof RootAuthStackParamList;
  component: (...event: any) => React.JSX.Element;
}> = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    name: 'OTP',
    component: LoginOTP,
  },
  {
    name: 'ProfileSignup',
    component: ProfileSignup,
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    name: 'Success',
    component: LoginSuccess,
  },
];

export const NativeBottomRouteList: Array<{
  name: keyof RootBottomTabParamList;
  component: (...event: any) => React.JSX.Element;
}> = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'FrontDesk',
    component: FrontDeskScreen,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
  },
];
