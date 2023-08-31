import React from 'react';
import WebView from 'react-native-webview';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {DailyProgramDetailProps} from '../../../../types';

export const DailyProgramDetail = ({
  route,
  navigation,
}: DailyProgramDetailProps): React.JSX.Element => {
  const title = route.params?.title;
  const description = route.params?.description;

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={title}
      />
      <WebView
        style={{
          backgroundColor: 'transparent',
        }}
        source={{
          html: `${description}`,
        }}
      />
    </ScreenWrapper>
  );
};
