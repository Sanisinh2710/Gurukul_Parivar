import React from 'react';
import {ActivityIndicator, Image, Modal, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AllIcons} from '../../../../assets/icons';

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
          style={{
            justifyContent: 'center',
          }}
          imageUrls={images}
          enableSwipeDown={true}
          renderIndicator={index => {
            return <></>;
          }}
          loadingRender={() => {
            return (
              <>
                <ActivityIndicator color={'white'} size={30} />
              </>
            );
          }}
          renderHeader={() => {
            return (
              <View
                style={{
                  position: 'absolute',
                  height: 34,
                  width: 34,
                  marginTop: 30,
                  alignSelf: 'flex-end',
                  zIndex: 2,
                }}
                onTouchEnd={() => setZoomModalVisiable(false)}>
                <Image
                  source={AllIcons.Cancel2}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            );
          }}
          show={false}
          onCancel={() => {
            setZoomModalVisiable(false);
          }}
          onSwipeDown={() => {
            setZoomModalVisiable(false);
          }}
        />
      </Modal>
    </>
  );
};
