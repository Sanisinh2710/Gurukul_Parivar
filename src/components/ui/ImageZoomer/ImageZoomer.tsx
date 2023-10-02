import React from 'react';
import {ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ImageZoomerProps} from '../../../types';

export const ImageZoomer = ({
  navigation,
  route,
}: ImageZoomerProps): React.JSX.Element => {
  const {images} = route.params;

  return (
    <ImageViewer
      show={false}
      imageUrls={images}
      enableSwipeDown={true}
      renderIndicator={_index => {
        return <></>;
      }}
      loadingRender={() => {
        return <ActivityIndicator color={'white'} size={30} />;
      }}
      onSwipeDown={() => {
        navigation.goBack();
      }}
    />
  );
};
