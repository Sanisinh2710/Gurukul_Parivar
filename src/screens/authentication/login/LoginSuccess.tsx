import React from 'react';
import {View} from 'react-native';
import {ScreenHeader} from '../../../components';

export const LoginSuccess = () => {
  return (
    <View>
      <View>
        <ScreenHeader
          theme={undefined}
          showLeft={true}
          headerTitleAlign="center"
        />
      </View>
    </View>
  );
};
