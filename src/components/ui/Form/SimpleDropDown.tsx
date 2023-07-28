import React from 'react';
import {Image, Text, View} from 'react-native';
import {DropDownModel} from '../Modal';
import {FormInputStyle} from './style';

type SimpleDropdownProps = {
  value: any;
  label: string;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  placeholder: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  state?: {
    [key: string]: any;
  };
  dropDownList: string[];
};

export const SimpleDropDown = React.memo(
  ({
    value,
    label,
    onChange,
    onBlur,
    placeholder,
    setFocused,
    state,
    dropDownList,
  }: SimpleDropdownProps): React.JSX.Element => {
    const style = FormInputStyle(value);

    const [modelVisible, setModelVisible] = React.useState(false);

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          onTouchEnd={() => {
            setModelVisible(!modelVisible);
          }}>
          <Text style={style.placeholderFonts}>
            {value === '' || value === undefined || value === 'undefined'
              ? placeholder
              : value}
          </Text>
          <View
            style={[
              {
                width: 30,
                height: 30,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              },
              modelVisible && {
                transform: [
                  {
                    rotate: '180deg',
                  },
                ],
              },
            ]}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
              }}
              source={require('../../../../assets/icons/ArrowCircleDown.png')}
            />
          </View>
        </View>

        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={dropDownList}
          wantSearchBar={true}
          type={'simple'}
          selectedItem={value}
          setSelectedItem={onChange}
          modalHeight={'90%'}
          label={label}
        />
      </>
    );
  },
);
