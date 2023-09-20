import React from 'react';
import {ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ImageZoomerProps} from '../../../types';
import {ScreenWrapper} from '../ScreenWrapper';

export const ImageZoomer = ({
  navigation,
  route,
}: ImageZoomerProps): React.JSX.Element => {
  const {images} = route.params;

  return (
    <ScreenWrapper>
      <ImageViewer
        style={{
          justifyContent: 'center',
        }}
        imageUrls={images}
        enableSwipeDown={true}
        renderIndicator={_index => {
          return <></>;
        }}
        loadingRender={() => {
          return (
            <>
              <ActivityIndicator color={'white'} size={30} />
            </>
          );
        }}
        // renderHeader={() => {
        //   return (
        //     <View
        //       style={{
        //         position: 'absolute',
        //         height: 34,
        //         width: 34,
        //         marginTop: 30,
        //         alignSelf: 'flex-end',
        //         zIndex: 2,
        //       }}
        //       onTouchEnd={() => navigation.goBack()}>
        //       <Image
        //         source={AllIcons.Cancel2}
        //         style={{
        //           height: '100%',
        //           width: '100%',
        //         }}
        //       />
        //     </View>
        //   );
        // }}
        // show={false}
        onSwipeDown={() => {
          navigation.goBack();
        }}
      />
    </ScreenWrapper>
  );
};
