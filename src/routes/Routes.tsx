import React, {ReactInstance, ReactNode} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomBottomTabBar, CustomStatusBar, Loader} from '../components';
import {TOGGLE_THEME} from '../redux/ducks/themeslice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  ForgotPassword,
  FrontDeskScreen,
  HomeScreen,
  LoginOTP,
  LoginScreen,
  LoginSuccess,
  ProfileScreen,
  ProfileSignup,
  RegisterScreen,
  ResetPassword,
} from '../screens';
import {isSignedIn} from '../services';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '../types';
import {NativeStackRoute} from './routes';

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
            {NativeStackRoute.map((route, index) => {
              return (
                <NativeStack.Screen
                  key={index}
                  name={route.name}
                  component={route.component}
                />
              );
            })}
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();
export const BottomTabNavigator = () => {
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
      {/* <BottomTab.Screen name="FrontDesk" component={CommingSoon} /> */}
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};
