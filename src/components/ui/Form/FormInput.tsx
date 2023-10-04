import React from 'react';

import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {useAppSelector} from '../../../redux/hooks';
import {SupportedFormInputTypes} from '../../../types';
import {COLORS, CustomFonts} from '../../../utils';
import {RadioLable} from '../Radio';
import {DatePicker} from './DatePicker';
import {PhoneDropdownInput} from './PhoneDropdownInput';
import {PhotoPicker} from './PhotoPicker';
import {SimpleDropDown} from './SimpleDropDown';
import {FormInputStyle} from './style';

export type FormInputProps = {
  type?: SupportedFormInputTypes;
  name?: string;
  label?: string;
  icon?: any;
  placeholder?: string;
  value: any;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  error?: string;
  state?: {[key: string]: any};
  menuList?: any;
  customProps?: object;
  rightText?: string;
  rightTextOnPress?: (...event: any[]) => void;
  defaultPhoneCountryCode?: any;
  editable?: boolean;
  required?: boolean;
  wantPlaceholderAsLabelOnModal?: boolean;
};

export const FormInput = React.memo(
  ({
    type,
    name,
    editable,
    label,
    icon,
    placeholder,
    value,
    onBlur,
    onChange,
    state,
    menuList,
    error,
    customProps,
    rightText,
    rightTextOnPress,
    required,
    defaultPhoneCountryCode,
    wantPlaceholderAsLabelOnModal,
  }: FormInputProps): React.JSX.Element => {
    const theme = useAppSelector(state => state.theme.theme);

    const style = FormInputStyle(value);

    const [passVisible, setPassVisible] = React.useState(false);

    let fieldblock;

    const [focused, setFocused] = React.useState(false);

    React.useEffect(() => {
      if (value === '' || value === undefined) {
        setFocused(false);
      } else {
        setFocused(true);
      }
    }, [value]);

    switch (type) {
      case 'phone':
        fieldblock = (
          <PhoneDropdownInput
            editable={editable ?? true}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            setFocused={setFocused}
            state={state}
            defaultPhoneCountryCode={defaultPhoneCountryCode}
          />
        );
        break;

      case 'photo':
        fieldblock = (
          <PhotoPicker
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            setFocused={setFocused}
          />
        );
        break;

      case 'select':
        fieldblock = (
          <SimpleDropDown
            type={'simple'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            placeholder={placeholder}
            setFocused={setFocused}
            dropDownList={menuList ? [...menuList] : []}
            customIcon={icon}
            wantPlaceholderAsLabelOnModal={wantPlaceholderAsLabelOnModal}
            {...customProps}
          />
        );
        break;

      case 'multi-select':
        fieldblock = (
          <SimpleDropDown
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            placeholder={placeholder}
            setFocused={setFocused}
            dropDownList={menuList ? [...menuList] : []}
            customIcon={icon}
            wantPlaceholderAsLabelOnModal={wantPlaceholderAsLabelOnModal}
            {...customProps}
          />
        );
        break;

      case 'radio':
        fieldblock = (
          <RadioLable
            list={menuList}
            showHeading={true}
            heading={label}
            value={value}
            onChange={onChange}
            customStyle={{}}
            wantFullSpace={true}
            required={required}
            {...customProps}
          />
        );
        break;

      case 'dob':
        fieldblock = (
          <DatePicker
            type={type}
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            focused={focused}
            placeholder={placeholder}
            setFocused={setFocused}
            customIcon={icon}
          />
        );
        break;

      case 'date':
        fieldblock = (
          <DatePicker
            type={type}
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            focused={focused}
            placeholder={placeholder}
            setFocused={setFocused}
            customIcon={icon}
          />
        );
        break;

      case 'number':
        fieldblock = (
          <TextInput
            keyboardType="numeric"
            inputMode="numeric"
            onFocus={() => setFocused(true)}
            value={typeof value === 'number' ? value.toString() : value}
            placeholder={placeholder}
            placeholderTextColor={theme.textColor}
            style={style.formTextInput}
            onBlur={onBlur}
            onChangeText={newvalue => {
              onChange(newvalue);
            }}
          />
        );
        break;

      case 'textarea':
        fieldblock = (
          <TextInput
            multiline={true}
            onFocus={() => setFocused(true)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.textColor}
            style={style.formTextInput}
            onBlur={onBlur}
            onChangeText={newvalue => {
              onChange(newvalue);
            }}
          />
        );
        break;

      case 'email':
        fieldblock = (
          <TextInput
            editable={editable ?? true}
            inputMode={'email'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            onFocus={() => setFocused(true)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.textColor}
            style={style.formTextInput}
            onBlur={onBlur}
            onChangeText={newvalue => {
              onChange(newvalue);
            }}
          />
        );
        break;

      case 'password':
        fieldblock = (
          <TextInput
            editable={editable ?? true}
            secureTextEntry={passVisible ? false : true}
            textContentType={'password'}
            onFocus={() => setFocused(true)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.textColor}
            style={style.formTextInput}
            onBlur={onBlur}
            onChangeText={newvalue => {
              onChange(newvalue);
            }}
          />
        );
        break;

      default:
        fieldblock = (
          <TextInput
            onFocus={() => setFocused(true)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.textColor}
            style={style.formTextInput}
            onBlur={onBlur}
            onChangeText={newvalue => {
              onChange(newvalue);
            }}
          />
        );
        break;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setFocused(false);
        }}>
        <View>
          {type !== 'photo' && type !== 'radio' ? (
            <>
              <View
                style={[
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text style={[style.labelText]}>
                  {label}
                  {required && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 20,
                      }}>
                      *
                    </Text>
                  )}
                </Text>
                {(type === 'phone' || type === 'email' || type === 'select') &&
                  rightText && (
                    <Text
                      onPress={rightTextOnPress ? rightTextOnPress : () => {}}
                      style={[style.labelText, {color: COLORS.primaryColor}]}>
                      {rightText}
                    </Text>
                  )}
              </View>
              <View
                style={[
                  style.fieldBlockView,
                  {
                    borderColor: focused
                      ? theme.primary
                      : COLORS.primaryInputBorderColor,
                    justifyContent: 'space-between',
                  },
                  type === 'textarea' && {
                    height: 80,
                    alignItems: 'flex-start',
                  },
                  icon &&
                    type !== 'select' &&
                    type !== 'date' &&
                    type !== 'dob' && {
                      gap: 3,
                    },
                ]}>
                {type === 'password' ? (
                  <View style={{width: '90%'}}>{fieldblock}</View>
                ) : icon &&
                  type !== 'select' &&
                  type !== 'date' &&
                  type !== 'dob' ? (
                  <View style={{width: '90%'}}>{fieldblock}</View>
                ) : (
                  fieldblock
                )}
                {type === 'password' ? (
                  <View
                    style={style.fieldImgView}
                    onTouchEnd={() => setPassVisible(!passVisible)}>
                    <Image
                      source={
                        passVisible ? AllIcons.OpenEye : AllIcons.ClosedEye
                      }
                      style={[
                        style.fieldRightImg,
                        {
                          tintColor: 'rgba(172, 43, 49, 0.5)',
                        },
                      ]}
                    />
                  </View>
                ) : (
                  icon &&
                  type !== 'select' &&
                  type !== 'date' &&
                  type !== 'dob' && (
                    <View style={style.fieldImgView}>
                      <Image source={icon} style={style.fieldRightImg} />
                    </View>
                  )
                )}
              </View>
              {Array.isArray(value) && type === 'multi-select' && (
                <View style={style.multiSelectMainView}>
                  {value.map((item, index) => {
                    return (
                      <View key={index} style={style.multiSelectInnerView}>
                        <Text style={style.multiSelectTitle}>{item}</Text>
                        <View
                          onTouchEnd={() => {
                            let newValues: string[] = JSON.parse(
                              JSON.stringify(value),
                            );
                            newValues.splice(index, 1);
                            onChange(newValues);
                          }}
                          style={style.multiSelectListView}>
                          <Image
                            source={AllIcons.RoundCross}
                            style={style.multiSelectRemoveImg}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </>
          ) : (
            fieldblock
          )}
          {error && <Text style={style.errorText}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
