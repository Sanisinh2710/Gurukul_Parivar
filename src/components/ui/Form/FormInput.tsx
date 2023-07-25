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
import {FormInputStyle} from './style';

type FormInputProps = {
  type: string;
  name: string;
  label: string;
  icon?: string;
  placeholder: string;
  value: any;
  onBlur: (...event: any[]) => void;
  onChange: (...event: any[]) => void;
  error?: string;
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
  error,
}: FormInputProps): React.JSX.Element => {
  const {theme} = useCustomTheme();

  const style = FormInputStyle(value);

  let fieldblock;

  const [focused, setFocused] = React.useState(false);
  const [visiblePass, setVisiblePass] = React.useState(false);

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
        <TextInput
          value={value}
          keyboardType="phone-pad"
          inputMode="tel"
          onFocus={() => setFocused(true)}
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
