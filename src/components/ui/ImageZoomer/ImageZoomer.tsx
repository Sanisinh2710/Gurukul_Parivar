import React from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

type SingleImage = {
  url: string;
  width?: number;
  height?: number;
  props?: {
    source?: any;
  };
};

type ImageZoomerProps = {
  images: Array<SingleImage>;
  zoomModalVisible: boolean;
  setZoomModalVisiable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImageZoomer = ({
  images,
  zoomModalVisible,
  setZoomModalVisiable,
}: ImageZoomerProps): React.JSX.Element => {
  return (
    <>
      <Modal visible={zoomModalVisible} transparent={true}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          renderIndicator={index => {
            return <></>;
          }}
          show={false}
          onSwipeDown={() => {
            setZoomModalVisiable(false);
          }}
        />
      </Modal>
    </>
  );
};
