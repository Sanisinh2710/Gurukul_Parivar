import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  CommingSoon,
  CustomBottomTabBar,
  CustomStatusBar,
  Loader,
} from '../components';
import {TOGGLE_THEME} from '../redux/ducks/themeslice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
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
  HomeScreen,
  LiveSatsang,
  LoginOTP,
  LoginScreen,
  LoginSuccess,
  ProfileScreen,
  ProfileSignup,
  ProfileSignupWithEdit,
  QuizResult,
  RegisterScreen,
  ResetPassword,
  Status,
} from '../screens';
import {isSignedIn} from '../services';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '../types';

const AuthStack = createNativeStackNavigator<RootAuthStackParamList>();

export const AuthStackNavigator = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Auth'>): React.JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsLoading(true);
    const isCurrentlySignedIn = isSignedIn();

    if (isCurrentlySignedIn) {
      navigation.replace('BottomNavBar');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          orientation: 'portrait',
          animation: 'none',
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />

        <AuthStack.Screen name="Register" component={RegisterScreen} />

        <AuthStack.Screen name="OTP" component={LoginOTP} />
        <AuthStack.Screen name="Success" component={LoginSuccess} />

        <AuthStack.Screen name="ProfileSignup" component={ProfileSignup} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      </AuthStack.Navigator>
    );
  }
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const Routes = (): React.JSX.Element => {
  const theme = useAppSelector(state => state.theme.theme);
  const themeMode = useAppSelector(state => state.theme.themeMode);

  const dispatch = useAppDispatch();
  const deviceColorScheme = useColorScheme();

  React.useEffect(() => {
    if (deviceColorScheme) {
      if (themeMode === 'default') {
        dispatch(
          TOGGLE_THEME({
            themeMode: 'default',
            variant: deviceColorScheme,
          }),
        );
      }
    }
  }, [deviceColorScheme, dispatch, themeMode]);

  return (
    <SafeAreaProvider>
      <CustomStatusBar theme={theme} />
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeStack.Navigator
            screenOptions={{
              animation: 'none',
              orientation: 'portrait',
              headerShown: false,
            }}>
            <NativeStack.Screen name="Auth" component={AuthStackNavigator} />

            <NativeStack.Screen
              name="BottomNavBar"
              component={BottomTabNavigator}
            />
            <NativeStack.Screen name="dailyDarshan" component={DailyDarshan} />
            <NativeStack.Screen
              name="dailyDarshanDetail"
              component={DailyDarshanDetail}
            />
            <NativeStack.Screen name="dailyUpdates" component={DailyUpdates} />
            <NativeStack.Screen
              name="dailyUpdateDetail"
              component={DailyUpdateDetail}
            />
            <NativeStack.Screen name="dailyQuotes" component={DailyQuotes} />
            <NativeStack.Screen name="calendar" component={CalendarScreen} />
            <NativeStack.Screen name="liveSatsang" component={LiveSatsang} />
            <NativeStack.Screen
              name="changeLanguage"
              component={ChangeLanguage}
            />
            <NativeStack.Screen name="editProfile" component={EditProfile} />
            <NativeStack.Screen name="status" component={Status} />
            <NativeStack.Screen name="dailyQuiz" component={DailyQuiz} />
            <NativeStack.Screen
              name="dailyQuizDetail"
              component={DailyQuizDetail}
            />
            <NativeStack.Screen name="QuizResult" component={QuizResult} />
            <NativeStack.Screen name="donation" component={DonationScreen} />
            <NativeStack.Screen name="program" component={DailyProgram} />
            <NativeStack.Screen
              name="programDetail"
              component={DailyProgramDetail}
            />
            <NativeStack.Screen
              name="ProfileEdit"
              component={ProfileSignupWithEdit}
            />
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();
const BottomTabNavigator = () => {
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      detachInactiveScreens={true}
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'rgba(0,0,0,0.9)',
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="FrontDesk" component={CommingSoon} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};
