import React from 'react';

import {useTranslation} from 'react-i18next';
import {Text, TextInput, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../../../redux/hooks';
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
    countryCodeSelect?: string;
    setCountryCodeSelect?: React.Dispatch<React.SetStateAction<string>>;
  };
  editable?: boolean;
  defaultPhoneCountryCode?: any;
};

export const PhoneDropdownInput = React.memo(
  ({
    value,
    onChange,
    onBlur,
    placeholder,
    setFocused,
    state,
    defaultPhoneCountryCode,
    editable,
  }: PhoneDropdownInputProps) => {
    const theme = useAppSelector(state => state.theme.theme);

    const {t} = useTranslation();

    const style = FormInputStyle(value);

    const [modelVisible, setModelVisible] = React.useState(false);

    const [modelValuechoosed, setModelValueChoosed] = React.useState(false);

    const [localval, setLocalVal] = React.useState(
      defaultPhoneCountryCode ||
        '+' +
          countries.find(val => val.iso === 'IN' && val)?.code +
          ' (' +
          countries.find(val => val.iso === 'IN' && val)?.iso +
          ')',
    );

    React.useEffect(() => {
      if (defaultPhoneCountryCode) {
        if (modelValuechoosed) {
          if (state) {
            if (state?.setCountryCodeSelect && localval) {
              state?.setCountryCodeSelect(
                localval?.split(' ')?.[0] + localval?.split(' ')?.[1],
              );
            }
          }
        }
      } else {
        if (state) {
          if (state?.setCountryCodeSelect && localval) {
            state?.setCountryCodeSelect(
              localval?.split(' ')?.[0] + localval?.split(' ')?.[1],
            );
          }
        }
      }
    }, [modelValuechoosed, localval]);

    return (
      <>
        <View
          onTouchEnd={
            editable
              ? () => {
                  setModelVisible(!modelVisible);
                }
              : () => {}
          }
          style={style.phoneDropFirstView}>
          <Text style={style.phoneDropFirstViewText}>
            {state && state.countryCodeSelect
              ? state?.countryCodeSelect
              : localval}
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
            editable={editable}
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
          label={t('loginScreen.SelectCountryLabel')}
          modelValuechoosed={modelValuechoosed}
          setModelValueChoosed={setModelValueChoosed}
        />
      </>
    );
  },
);
