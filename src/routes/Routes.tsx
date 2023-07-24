import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomStatusBar} from '../components';
import {useCustomTheme} from '../hooks';
import {LoginOTP, LoginScreen, LoginSuccess} from '../screens';
import {RootAuthStackParamList, RootStackParamList} from '../types';

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
    </AuthStack.Navigator>
  );
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const Routes = (): React.JSX.Element => {
  const {theme} = useCustomTheme();

  return (
    <SafeAreaProvider>
      <CustomStatusBar
        backgroundColor={theme.statusBarBackground}
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
            <NativeStack.Screen name="Auth" component={AuthStackNavigator} />
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};
