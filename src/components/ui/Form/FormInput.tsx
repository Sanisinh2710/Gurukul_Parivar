import React, {useState} from 'react';

import {
  FlatList,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../hooks';
import {COLORS, CustomFonts, countries} from '../../../utils';
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

  const [modelVisible, setModelVisible] = React.useState(false);

  const [searchvalue, setSearchValue] = useState<string>('');

  const [localval, setLocalVal] = React.useState(
    type === 'phone'
      ? '+' +
          countries.find(val => val.iso === 'IN' && val)?.code +
          ' (' +
          countries.find(val => val.iso === 'IN' && val)?.iso +
          ')'
      : '',
  );

  const [countryCodeList, setCountryCodeList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (value === '' || value === undefined) {
      setFocused(false);
    } else {
      setFocused(true);
    }
  }, [value]);

  React.useEffect(() => {
    let temp = [
      ...countries.map(item => {
        return '+' + item.code + ' (' + item.iso + ')' + ' ' + item.country;
      }),
    ];

    if (
      searchvalue !== null &&
      searchvalue !== undefined &&
      searchvalue !== ''
    ) {
      let abc = temp.filter((mainitem: any) => {
        if (
          mainitem
            .toString()
            .toLowerCase()
            .includes(searchvalue.trim().toLowerCase())
        ) {
          return mainitem;
        }
      });

      setCountryCodeList(abc);
    } else {
      setCountryCodeList([
        ...countries.map(item => {
          return '+' + item.code + ' (' + item.iso + ')' + ' ' + item.country;
        }),
      ]);
    }
  }, [searchvalue]);

  React.useEffect(() => {
    if (value && type === 'phone') {
      const newvalue = value.split(')')[1];
      onChange(localval + newvalue);
    }
  }, [localval]);

  switch (type) {
    case 'phone':
      fieldblock = (
        <>
          <View
            onTouchEnd={() => {
              setModelVisible(!modelVisible);
            }}
            style={{
              width: '20%',
              height: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...CustomFonts.body.large14,
                color: theme.textColor,
                fontSize: 16,
              }}>
              {localval}
            </Text>
            <MaterialCommunityIcon
              name={modelVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.textColor}
            />
            <View
              style={{
                height: '100%',
                borderRightWidth: 1,
                borderRightColor: theme.primary,
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{width: '80%', paddingLeft: '5%'}}>
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
                if (value) {
                  onChange(newvalue);
                } else {
                  onChange(localval + newvalue);
                }
              }}
            />
          </View>
          <Modal
            transparent
            visible={modelVisible}
            animationType="fade"
            onDismiss={() => {
              setModelVisible(false);
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  marginTop: '70%',
                  width: 375,
                  height: 300,
                  backgroundColor: '#FFFFFF',
                  elevation: 5,
                  borderRadius: 10,
                  paddingTop: 20,
                  paddingHorizontal: 30,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 10,
                  }}>
                  <MaterialCommunityIcon
                    name="magnify"
                    size={25}
                    color={theme.textColor}
                  />
                  <TextInput
                    value={searchvalue}
                    placeholder={'Find your country code'}
                    placeholderTextColor={theme.textColor}
                    style={[style.formTextInput, {width: '80%'}]}
                    onChangeText={val => {
                      setSearchValue(val);
                    }}
                  />
                  <MaterialCommunityIcon
                    name="close"
                    size={25}
                    color={theme.textColor}
                    onPress={() => setSearchValue('')}
                  />
                </View>
                <FlatList
                  contentContainerStyle={{
                    paddingTop: 20,
                    gap: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={countryCodeList}
                  renderItem={({item, index}) => {
                    return (
                      <Text
                        onPress={() => {
                          const newItem =
                            item.split(' ').at(0) + ' ' + item.split(' ').at(1);
                          setLocalVal(newItem);
                          setModelVisible(false);
                        }}
                        style={{
                          ...CustomFonts.body.large14,
                          fontSize: 16,
                          color: theme.textColor,
                        }}>
                        {item}
                      </Text>
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
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
          setModelVisible(false);
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
