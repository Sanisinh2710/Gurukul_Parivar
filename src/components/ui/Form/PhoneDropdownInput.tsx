import React from 'react';

import {useTranslation} from 'react-i18next';
import {Text, TextInput, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../hooks';
import {AllCountryCodes, countries} from '../../../utils';
import {DropDownModel} from '../Modal';
import {FormInputStyle} from './style';

type PhoneDropdownInputProps = {
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  placeholder: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  state?: {
    [key: string]: any;
  };
};

export const PhoneDropdownInput = React.memo(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    setFocused,
    state,
  }: PhoneDropdownInputProps) => {
    const {theme} = useCustomTheme();

    const {t} = useTranslation();

    const style = FormInputStyle(value);

    const [modelVisible, setModelVisible] = React.useState(false);

    const [localval, setLocalVal] = React.useState(
      '+' +
        countries.find(val => val.iso === 'IN' && val)?.code +
        ' (' +
        countries.find(val => val.iso === 'IN' && val)?.iso +
        ')',
    );

    React.useEffect(() => {
      if (state) {
        state.setCountryCodeSelect(localval);
      }
    }, [localval]);

    return (
      <>
        <View
          onTouchEnd={() => {
            setModelVisible(!modelVisible);
          }}
          style={style.phoneDropFirstView}>
          <Text style={style.phoneDropFirstViewText}>
            {state?.countryCodeSelect?.split(' ')?.[0] +
              state?.countryCodeSelect?.split(' ')?.[1] !==
              undefined &&
            state?.countryCodeSelect?.split(' ')?.[0] +
              state?.countryCodeSelect?.split(' ')?.[1] !==
              '' &&
            state?.countryCodeSelect?.split(' ')?.[0] +
              state?.countryCodeSelect?.split(' ')?.[1] !==
              'undefined'
              ? state?.countryCodeSelect?.split(' ')?.[0] +
                state?.countryCodeSelect?.split(' ')?.[1]
              : '+' +
                countries.find(val => val.iso === 'IN' && val)?.code +
                ' (' +
                countries.find(val => val.iso === 'IN' && val)?.iso +
                ')'}
          </Text>
          <MaterialCommunityIcon
            name={modelVisible ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={theme.textColor}
          />
          <View style={style.phoneDropFirstViewRightBorder} />
        </View>
        <View style={style.phoneTextView}>
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
        </View>
        <DropDownModel
          modelVisible={modelVisible}
          setModelVisible={setModelVisible}
          inputList={AllCountryCodes}
          wantSearchBar={true}
          type={'phone'}
          selectedItem={localval}
          setSelectedItem={setLocalVal}
          modalHeight={'90%'}
          label={t('loginScreen:SelectCountryLabel')}
        />
      </>
    );
  },
);
