/* eslint-disable react/no-unstable-nested-components */
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
      {/* <AuthStack.Screen name="MobileLogin" component={LoginScreen} />
      <AuthStack.Screen name="MobileLoginOTP" component={LoginOTP} />
      <AuthStack.Screen name="LoginSuccess" component={LoginSuccess} /> */}
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
            <NativeStack.Screen name="dailyUpdates" component={DailyUpdates} />
            <NativeStack.Screen name="dailyQuotes" component={DailyQuotes} />
            <NativeStack.Screen name="calendar" component={CalendarScreen} />
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
