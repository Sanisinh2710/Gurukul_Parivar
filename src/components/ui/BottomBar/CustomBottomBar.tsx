import React from 'react';

import {AllIcons} from '@assets';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {useAppSelector} from '@redux/hooks';
import {Theme} from '@types';
import {CustomFonts} from '@utils';
import {Image, Pressable, Text, View} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {BottomNavStyle} from './BottomNav.style';

export const CustomBottomTabBar = React.memo(
  ({
    state,
    descriptors,
    navigation,
  }: {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    insets: EdgeInsets;
  }): React.JSX.Element => {
    const theme = useAppSelector(state => state.theme.theme);

    const style = BottomNavStyle(theme);

    return (
      <View style={style.barStyle}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={style.innerViewButton}>
              <NavigationIcon
                theme={theme}
                route={label}
                isFocused={isFocused}
                options={options}
              />
            </Pressable>
          );
        })}
      </View>
    );
  },
);

const NavigationIcon = React.memo(
  ({
    theme,
    route,
    isFocused,
    options,
  }: {
    theme: Theme;
    route: string;
    isFocused: boolean;
    options: BottomTabNavigationOptions;
  }): React.JSX.Element => {
    const style = BottomNavStyle(theme);

    let icon = [];
    let label = '';
    switch (route) {
      case 'Home':
        label = 'Home';
        icon[0] = AllIcons.Home;
        icon[1] = AllIcons.HomeOutline;
        break;

      case 'FrontDesk':
        label = 'FrontDesk';
        icon[0] = AllIcons.Category;
        icon[1] = AllIcons.CategoryOutline;
        break;

      case 'Profile':
        label = 'Profile';
        icon[0] = AllIcons.Profile;
        icon[1] = AllIcons.ProfileOutline;
        break;
    }

    let fieldBlock = (
      <>
        {isFocused && <View style={style.bottomBarLine} />}
        <Image
          source={isFocused ? icon[0] : icon[1]}
          style={{
            tintColor: isFocused
              ? options.tabBarActiveTintColor
              : options.tabBarInactiveTintColor,
            height: 24,
            width: 24,
          }}
        />
        {options.tabBarShowLabel === true && (
          <Text
            style={{
              ...CustomFonts.body.large14,
              fontSize: 17,
              color: isFocused
                ? options.tabBarActiveTintColor
                : options.tabBarInactiveTintColor,
            }}>
            {label}
          </Text>
        )}
      </>
    );

    return fieldBlock;
  },
);
