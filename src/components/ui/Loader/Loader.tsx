import React from 'react';

import {useAppSelector} from '@redux/hooks';
import {
  ActivityIndicator,
  DimensionValue,
  Dimensions,
  Platform,
  Text,
  View,
} from 'react-native';
import { loaderStyle } from './style';
type LoaderProps = {
  screenHeight?: DimensionValue;
};

export const Loader = React.memo(
  ({ screenHeight }: LoaderProps): React.JSX.Element => {
    const theme = useAppSelector(state => state.theme.theme);
    const styles = loaderStyle()
    return (
      <View
        style={[styles.loaderMainView, {
          height: screenHeight || '100%',
        }]}>
        <View
          style={styles.loaderView}>
          <View
            style={
              Platform.OS === 'android'
                ? styles.androidLoaderinnerView
                : styles.iosLoaderInnerView
            }>
            <Text
              style={styles.loaderText}>
              Loading...
            </Text>
            <ActivityIndicator size={30} color={theme.primary} />
          </View>
        </View>
      </View>
    );
  },
);
