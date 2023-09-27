import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityIndicator, Dimensions, PanResponder, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const ZoomImageScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'zoomImage'>) => {
  const Image = route.params.image;
  const style = styles();
  const commonStyle = CommonStyle();
  const [imgLoad, setimgLoad] = React.useState<boolean>(false);
  const {width, height} = Dimensions.get('window');
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      // onEnd: () => {
      //   scale.value = withTiming(1);
      // },
    });
  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });
  const focalStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <ScreenWrapper>
      <GestureHandlerRootView style={{flex: 1, width: '100%'}}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View
            style={[
              {
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {imgLoad && (
              <ActivityIndicator
                size={30}
                color={COLORS.primaryColor}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />
            )}

            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View
                style={{
                  height: '100%',
                  width: '100%',
                }}>
                <Animated.Image
                  style={[style.images, rStyle]}
                  source={{uri: `${BASE_URL}${Image}`}}
                  resizeMode="contain"
                  onLoadStart={() => setimgLoad(true)}
                  onLoadEnd={() => setimgLoad(false)}
                />
                <Animated.View style={[focalStyle]} />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScreenWrapper>
  );
};
