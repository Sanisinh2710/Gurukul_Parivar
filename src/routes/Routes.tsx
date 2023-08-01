import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomStatusBar} from '../components';
import {TOGGLE_THEME} from '../redux/ducks/themeslice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {LoginOTP, LoginScreen, LoginSuccess, ProfileSignup} from '../screens';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '../types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import {HomeScreen} from '../screens/core/Home/home';
import {ProfileScreen} from '../screens/core/Profile/Profile';
import {FrontDeskScreen} from '../screens/core/FrontDesk/frontDesk';
import {styles} from './BottomTabStyles';
import {DailyDarshan} from '../screens/other/HomeStack/DailyDarshan/DailyDarshan';
import {DailyQuotes} from '../screens/other/HomeStack/DailyQuotes/DailyQuotes';
import {DailyUpdates} from '../screens/other/HomeStack/DailyUpdates/DailyUpdates';
import {CalendarScreen} from '../screens/other/HomeStack/Calendar/CalendarScreen';

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

const Tab = createBottomTabNavigator<RootBottomTabParamList>();
const BottomTabNavigator = () => {
  const style = styles();
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'rgba(0,0,0,0.9)',
        tabBarStyle: {
          position: 'absolute',
          height: 75,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <>
                {focused && <View style={style.bottomBarLine} />}
                <Image
                  source={
                    focused
                      ? require('../../assets/icons/Home.png')
                      : require('../../assets/icons/Home-Outline.png')
                  }
                  style={{
                    tintColor: color,
                    height: 24,
                    width: 24,
                  }}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <>
                {focused && <View style={style.bottomBarLine} />}
                <Image
                  source={
                    focused
                      ? require('../../assets/icons/Category.png')
                      : require('../../assets/icons/Category-Outline.png')
                  }
                  style={{
                    tintColor: color,
                    height: 24,
                    width: 24,
                  }}
                />
              </>
            );
          },
        }}
        name="frontDesk"
        component={FrontDeskScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <>
                {focused && <View style={style.bottomBarLine} />}
                <Image
                  source={
                    focused
                      ? require('../../assets/icons/Profile.png')
                      : require('../../assets/icons/Profile-Outline.png')
                  }
                  style={{
                    tintColor: color,
                    height: 24,
                    width: 24,
                  }}
                />
              </>
            );
          },
        }}
        name="profileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
