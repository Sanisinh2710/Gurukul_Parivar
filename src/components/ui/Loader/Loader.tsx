import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Dimensions,
  Platform,
  Text,
  View,
} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';

type LoaderProps = {
  screenHeight?: DimensionValue;
};

export const Loader = React.memo(
  ({screenHeight}: LoaderProps): React.JSX.Element => {
    const theme = useAppSelector(state => state.theme.theme);

    return (
      <View
        style={{
          height: screenHeight || '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={
              Platform.OS === 'android'
                ? {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    elevation: 10,
                    height: Dimensions.get('window').height * 0.1,
                    width: Dimensions.get('window').width * 0.8,
                  }
                : {
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    shadowColor: 'grey',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    height: Dimensions.get('window').height * 0.1,
                    width: Dimensions.get('window').width * 0.8,
                  }
            }>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
              }}>
              Loading...
            </Text>
            <ActivityIndicator size={30} color={theme.primary} />
          </View>
        </View>
      </View>
    );
  },
);
