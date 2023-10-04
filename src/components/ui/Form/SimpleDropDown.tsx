import React from 'react';
import {Image, Text, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {isObjectArray} from '../../../utils';
import {DropDownModel} from '../Modal';
import {FormInputStyle} from './style';

type SimpleDropdownProps = {
  type: 'phone' | 'radio' | 'multi-select' | 'simple' | 'none';
  value: any;
  label?: string;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  placeholder?: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  state?: {
    [key: string]: any;
  };
  dropDownList: Array<string> | Array<object>;
  customIcon?: any;
  wantPlaceholderAsLabelOnModal?: boolean;
  wantSearchBar?: boolean;
};

export const SimpleDropDown = React.memo(
  ({
    type,
    value,
    label,
    onChange,
    onBlur,
    placeholder,
    setFocused,
    state,
    dropDownList,
    customIcon,
    wantPlaceholderAsLabelOnModal,
    wantSearchBar,
  }: SimpleDropdownProps): React.JSX.Element => {
    const style = FormInputStyle(value);

    const [modelVisible, setModelVisible] = React.useState(false);

    return (
      <>
        <View
          style={style.simpleDropDownMianView}
          onTouchEnd={() => {
            setModelVisible(!modelVisible);
          }}>
          <Text style={style.placeholderFonts}>
            {type !== 'multi-select'
              ? value === '' ||
                value === undefined ||
                value === 'undefined' ||
                value === null
                ? placeholder
                : value && isObjectArray(dropDownList)
                ? dropDownList?.find(
                    (item: any) => parseInt(item.id) === parseInt(value),
                  )?.name
                : value
              : placeholder}
          </Text>
          <View
            style={[
              style.rightSideImgView,
              modelVisible && {
                transform: [
                  {
                    rotate: '180deg',
                  },
                ],
              },
            ]}>
            <Image
              style={style.rightSideImgStyle}
              source={customIcon || AllIcons.RoundedArrow}
            />
          </View>
        </View>
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={dropDownList}
          wantSearchBar={wantSearchBar ?? true}
          type={type}
          selectedItem={value}
          setSelectedItem={onChange}
          modalHeight={'90%'}
          label={wantPlaceholderAsLabelOnModal ? placeholder : label}
        />
      </>
    );
  },
);
