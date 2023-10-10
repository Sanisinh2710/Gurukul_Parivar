import React from 'react';

import {AllIcons} from '@assets';
import {captureImage, chooseFile, isString} from '@utils';
import {Alert, Image, Text, View} from 'react-native';
import {FormInputStyle} from './style';

type PhotoPickerProps = {
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  placeholder?: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhotoPicker = React.memo(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    setFocused,
  }: PhotoPickerProps): React.JSX.Element => {
    const style = FormInputStyle();

    const handleUploadPhoto = () => {
      Alert.alert('Select profile picture', '', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Choose from gallery',
          onPress: async () => {
            let path = await chooseFile('photo');
            if (path) {
              onChange(path);
            }
          },
        },
        {
          text: 'Capture your photo',
          onPress: async () => {
            let path = await captureImage('photo');
            if (path) {
              onChange(path);
            }
          },
        },
      ]);
    };

    return (
      <View style={style.photoMainView} onTouchEnd={() => handleUploadPhoto()}>
        <View style={style.photOutSideView}>
          <View style={style.photoView}>
            {value ? (
              <Image
                source={{uri: isString(value) ? value : value?.[0]?.uri}}
                style={style.image}
              />
            ) : (
              <Image source={AllIcons.Avtar} style={style.avtar} />
            )}
          </View>
        </View>
        <Text style={style.photoBottomText}>{placeholder}</Text>
      </View>
    );
  },
);
