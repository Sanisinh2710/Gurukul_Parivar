import React from 'react';

import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useCustomTheme} from '../../../hooks';
import {COLORS} from '../../../utils';
import {PhoneDropdownInput} from './PhoneDropdownInput';
import {FormInputStyle} from './style';

type FormInputProps = {
  type: 'phone' | 'number' | 'text';
  name: string;
  label: string;
  icon?: string;
  placeholder: string;
  value: any;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  error?: string;
  state?: {[key: string]: any};
};

export const FormInput = ({
  type,
  name,
  label,
  icon,
  placeholder,
  value,
  onBlur,
  onChange,
  state,
  error,
}: FormInputProps): React.JSX.Element => {
  const {theme} = useCustomTheme();

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
          <Text style={style.labelText}>{label}</Text>
          <View
            style={[
              style.fieldBlockView,
              {
                borderColor: focused
                  ? theme.primary
                  : COLORS.primaryInputBorderColor,
              },
            ]}>
            {fieldblock}
          </View>
        </>
      </TouchableWithoutFeedback>
      {error && <Text style={style.errorText}>{error}</Text>}
    </View>
  );
};
