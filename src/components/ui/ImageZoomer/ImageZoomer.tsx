import React from 'react';
import {ActivityIndicator, Image, Modal, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AllIcons} from '../../../../assets/icons';
import {COLORS} from '../../../utils';

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
  const [imgLoad, setimgLoad] = React.useState<boolean>(false);

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
          renderHeader={() => {
            return (
              // <View
              //   style={{
              //     position: 'absolute',
              //     width: '100%',
              //     flexDirection: 'row',
              //     justifyContent: 'flex-end',
              //     marginTop: 50,
              //     backgroundColor: 'green',
              //   }}>
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
                {imgLoad && (
                  <ActivityIndicator
                    size={30}
                    color={'white'}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                )}
                <Image
                  source={AllIcons.Cancel2}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  onLoadStart={() => setimgLoad(true)}
                  onLoadEnd={() => setimgLoad(false)}
                />
              </View>
              // </View>
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
