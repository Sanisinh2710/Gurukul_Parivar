import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const NativeStack = createNativeStackNavigator();

export const Routes = (): React.JSX.Element => {
  //   const theme = MyAppTheme();

  return (
    <SafeAreaProvider>
      {/* <CustomStatusBar backgroundColor={theme.statusBarColor} theme={theme} /> */}

      <SafeAreaProvider>
        <NavigationContainer>
          <NativeStack.Navigator
            screenOptions={{
              animation: 'none',
              orientation: 'portrait',
              headerShown: false,
            }}>
            <NativeStack.Screen name="Auth" component={<></>} />
            <NativeStack.Screen name="BottomNavBar" component={<></>} />
          </NativeStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
};
