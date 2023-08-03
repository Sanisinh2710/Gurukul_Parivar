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
import {COLORS, CustomFonts} from '../../../utils';
import {RadioLable} from '../Radio';
import {PhoneDropdownInput} from './PhoneDropdownInput';
import {PhotoPicker} from './PhotoPicker';
import {SimpleDropDown} from './SimpleDropDown';
import {FormInputStyle} from './style';
import {AllIcons} from '../../../../assets/icons';

type FormInputProps = {
  type: 'phone' | 'number' | 'text' | 'select' | 'photo' | 'radio' | 'checkbox';
  name: string;
  label: string;
  icon?: string;
  placeholder: string;
  value: any;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  error?: string;
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

      case 'checkbox':
        fieldblock = (
          <>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginBottom: '5%',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  alignItems: 'center',
                  borderRadius: 5,
                  borderColor: COLORS.primaryColor,
                  borderWidth: value ? 0 : 1,
                }}
                onTouchEnd={() => {
                  onChange(!value);
                }}>
                {value ? (
                  <Image
                    source={AllIcons.checkbox}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  ...CustomFonts.body.medium12,
                  fontSize: 14,
                  fontWeight: '400',
                  color: theme.textColor,
                  lineHeight: 18.9,
                }}>
                {/* This address is my preferred communication address */}
                {label}
              </Text>
            </View>
          </>
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
            {type !== 'photo' && type !== 'radio' && type !== 'checkbox' ? (
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
                  ]}>
                  {fieldblock}
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
