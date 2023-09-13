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

  const styledHTMLData = description?.replaceAll(
    '<strong>', // Replace this with the actual HTML element you want to style
    `<strong style="color: rgb(172,42,43)">`,
  );

  console.log(styledHTMLData);

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
          margin: 20,
        }}
        source={{
          html: `${styledHTMLData}`,
        }}
      />
    </ScreenWrapper>
  );
};
