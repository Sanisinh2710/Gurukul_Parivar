import React from 'react';
import WebView from 'react-native-webview';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {DailyProgramDetailProps} from '../../../../types';
import {Linking} from 'react-native';

export const DailyProgramDetail = ({
  route,
  navigation,
}: DailyProgramDetailProps): React.JSX.Element => {
  const title = route.params?.title;
  const description = route.params?.description;

  // const styledHTMLData = description?.replaceAll(
  //   '<strong>', // Replace this with the actual HTML element you want to style
  //   `<strong style="color: rgb(172,42,43)">`,
  // );

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
        scalesPageToFit={false}
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 20,
        }}
        onShouldStartLoadWithRequest={request => {
          if (request.url !== 'about:blank') {
            Linking.openURL(request.url);
            return false;
          } else return true;
        }}
        source={{
          html: `<html><head><style>body {padding:20px;}</style></head><body>${description}</body></html>`,
        }}
      />
    </ScreenWrapper>
  );
};
