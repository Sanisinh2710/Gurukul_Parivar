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
    defaultPhoneCountryCode,
  }: FormInputProps): React.JSX.Element => {
    const theme = useAppSelector(state => state.theme.theme);

    const style = FormInputStyle(value);

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
            editable={editable}
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
            inputMode={'email'}
            keyboardType={'email-address'}
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
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setFocused(false);
          }}>
          <>
            {type !== 'photo' && type !== 'radio' ? (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.labelText}>{label}</Text>
                  {(type === 'phone' ||
                    type === 'email' ||
                    type === 'select') &&
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
                  {icon &&
                  type !== 'select' &&
                  type !== 'date' &&
                  type !== 'dob' ? (
                    <View style={{width: '90%'}}>{fieldblock}</View>
                  ) : (
                    fieldblock
                  )}
                  {icon &&
                    type !== 'select' &&
                    type !== 'date' &&
                    type !== 'dob' && (
                      <View
                        style={{
                          height: '50%',
                          width: '10%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={icon}
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    )}
                </View>
                {Array.isArray(value) && type === 'multi-select' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 10,
                      gap: 8,
                      flexWrap: 'wrap',
                      marginBottom: '3%',
                    }}>
                    {value.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            backgroundColor: COLORS.primaryColor,
                            paddingLeft: 16,
                            paddingRight: 10,
                            height: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 60,
                            gap: 10,
                          }}>
                          <Text
                            style={{
                              ...CustomFonts.body.large14,
                              lineHeight: 18.9,
                              color: COLORS.darkModetextColor,
                            }}>
                            {item}
                          </Text>
                          <View
                            onTouchEnd={() => {
                              let newValues: string[] = JSON.parse(
                                JSON.stringify(value),
                              );
                              newValues.splice(index, 1);
                              onChange(newValues);
                            }}
                            style={{
                              width: 14,
                              height: 14,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={AllIcons.RoundCross}
                              style={{
                                flex: 1,
                                tintColor: COLORS.darkModeIconColor,
                                resizeMode: 'contain',
                              }}
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
          </>
        </TouchableWithoutFeedback>
        {error && <Text style={style.errorText}>{error}</Text>}
      </View>
    );
  },
);
