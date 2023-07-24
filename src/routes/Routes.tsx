import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootAuthStackParamList, RootStackParamList} from '../types';
import {LoginSuccess} from '../screens';

const AuthStack = createNativeStackNavigator<RootAuthStackParamList>();

export const AuthStackNavigator = (): React.JSX.Element => {
  return (
    <AuthStack.Navigator
      // initialRouteName="MobileLogin"
      screenOptions={{
        orientation: 'portrait',
        animation: 'none',
        headerShown: false,
      }}>
      <AuthStack.Screen name="LoginSuccess" component={LoginSuccess} />
      {/* <AuthStack.Screen name="MobileLogin" component={<></>} />
      <AuthStack.Screen name="MobileLoginOTP" component={<></>} /> */}
    </AuthStack.Navigator>
  );
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const Routes = (): React.JSX.Element => {
  //   const theme = MyAppTheme();

  return (
    <SafeAreaProvider>
      {/* <CustomStatusBar backgroundColor={theme.statusBarColor} theme={theme} />  */}

      <SafeAreaProvider>
        <NavigationContainer>
          <NativeStack.Navigator
            screenOptions={{
              animation: 'none',
              orientation: 'portrait',
              headerShown: false,
            }}>
            <NativeStack.Screen name="Auth" component={AuthStackNavigator} />
            {/* <NativeStack.Screen name="BottomNavBar" component={<></>} /> */}
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};
