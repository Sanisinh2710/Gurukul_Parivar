import React from 'react';

import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS} from '../../../utils';
import {RadioLable} from '../Radio';
import {DatePicker} from './DatePicker';
import {PhoneDropdownInput} from './PhoneDropdownInput';
import {PhotoPicker} from './PhotoPicker';
import {SimpleDropDown} from './SimpleDropDown';
import {FormInputStyle} from './style';

type FormInputProps = {
  type:
    | 'phone'
    | 'number'
    | 'text'
    | 'select'
    | 'photo'
    | 'radio'
    | 'dob'
    | 'date'
    | 'textarea';
  name: string;
  label: string;
  icon?: any;
  placeholder: string;
  value: any;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  error?: any | unde;
  state?: {[key: string]: any};
  menuList?: any;
  customProps?: object;
};

export const FormInput = React.memo(
  ({
    type,
    name,
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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            setFocused={setFocused}
            state={state}
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
                <Text style={style.labelText}>{label}</Text>
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
                      type !== 'select' && {
                        gap: 3,
                      },
                  ]}>
                  {icon && type !== 'select' ? (
                    <View style={{width: '90%'}}>{fieldblock}</View>
                  ) : (
                    fieldblock
                  )}
                  {icon && type !== 'select' && (
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
