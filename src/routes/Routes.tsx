import React from 'react';

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
import {isSignedIn} from '../services';
import {
  RootAuthStackParamList,
  RootBottomTabParamList,
  RootStackParamList,
} from '../types';
import {
  NativeAuthStackRouteList,
  NativeBottomRouteList,
  NativeStackRouteList,
} from './routes';

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
        {NativeAuthStackRouteList.map((item, index) => {
          return (
            <AuthStack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </AuthStack.Navigator>
    );
  }
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export const BottomTabNavigator = () => {
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'rgba(0,0,0,0.9)',
      }}>
      {NativeBottomRouteList.map((item, index) => {
        return (
          <BottomTab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </BottomTab.Navigator>
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
            {NativeStackRouteList.map((item, index) => {
              return (
                <NativeStack.Screen
                  key={item.name}
                  name={item.name}
                  component={item.component}
                />
              );
            })}
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};
