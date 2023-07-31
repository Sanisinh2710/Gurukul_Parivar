import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomStatusBar} from '../components';
import {TOGGLE_THEME} from '../redux/ducks/themeslice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {LoginOTP, LoginScreen, LoginSuccess, ProfileSignup} from '../screens';
import {RootAuthStackParamList, RootStackParamList} from '../types';

const AuthStack = createNativeStackNavigator<RootAuthStackParamList>();

export const AuthStackNavigator = (): React.JSX.Element => {
  return (
    <AuthStack.Navigator
      initialRouteName="MobileLogin"
      screenOptions={{
        orientation: 'portrait',
        animation: 'flip',
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
