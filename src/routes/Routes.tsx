import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomBottomTabBar, CustomStatusBar} from '../components';
import {TOGGLE_THEME} from '../redux/ducks/themeslice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  CalendarScreen,
  ChangeLanguage,
  DailyDarshan,
  DailyQuotes,
  DailyUpdates,
  FrontDeskScreen,
  HomeScreen,
  LoginOTP,
  LoginScreen,
  LoginSuccess,
  ProfileScreen,
  ProfileSignup,
} from '../screens';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '../types';
import {DailyDarshanDetail} from '../screens/other/HomeStack/DailyDarshanDetail';
import {DailyUpdateDetail} from '../screens/other/HomeStack/DailyUpdateDetail';
import {LiveSatsang} from '../screens/other/HomeStack/LiveSatsang';
import {EditProfile} from '../screens/other/ProfileStack/EditProfile';
import {DailyQuiz, Status} from '../screens/other/FrontDeskStack';
import {DailyQuizDetail} from '../screens/other/FrontDeskStack/QuizDetail/DailyQuizDetail';
import {DonationScreen} from '../screens/other/FrontDeskStack/Donation';

const AuthStack = createNativeStackNavigator<RootAuthStackParamList>();

export const AuthStackNavigator = (): React.JSX.Element => {
  return (
    <AuthStack.Navigator
      initialRouteName="MobileLogin"
      screenOptions={{
        orientation: 'portrait',
        animation: 'none',
        headerShown: false,
      }}>
      <AuthStack.Screen name="MobileLogin" component={LoginScreen} />
      <AuthStack.Screen name="MobileLoginOTP" component={LoginOTP} />
      <AuthStack.Screen name="LoginSuccess" component={LoginSuccess} />
      <AuthStack.Screen name="ProfileSignup" component={ProfileSignup} />
    </AuthStack.Navigator>
  );
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
  }, [deviceColorScheme]);

  return (
    <SafeAreaProvider>
      <CustomStatusBar
        // backgroundColor={theme.statusBarBackground}
        theme={theme}
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeStack.Navigator
            screenOptions={{
              animation: 'none',
              orientation: 'portrait',
              headerShown: false,
            }}>
            {/* <NativeStack.Screen name="Auth" component={AuthStackNavigator} /> */}
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
            <NativeStack.Screen name="donation" component={DonationScreen} />
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
      <BottomTab.Screen name="FrontDesk" component={FrontDeskScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};
