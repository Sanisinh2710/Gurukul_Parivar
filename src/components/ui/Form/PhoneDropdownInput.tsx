import React from 'react';

import {FlatList, Modal, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../hooks';
import {countries} from '../../../utils';
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

export const PhoneDropdownInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  setFocused,
  state,
}: PhoneDropdownInputProps) => {
  const {theme} = useCustomTheme();

  const style = FormInputStyle(value);

  const [modelVisible, setModelVisible] = React.useState(false);

  const [searchvalue, setSearchValue] = React.useState<string>('');

  const [localval, setLocalVal] = React.useState(
    '+' +
      countries.find(val => val.iso === 'IN' && val)?.code +
      ' (' +
      countries.find(val => val.iso === 'IN' && val)?.iso +
      ')',
  );

  const [countryCodeList, setCountryCodeList] = React.useState<string[]>([]);

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
          {state?.countryCodeSelect}
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
      <Modal
        transparent
        visible={modelVisible}
        animationType="fade"
        onDismiss={() => {
          setModelVisible(false);
        }}>
        <View style={style.phoneModelMainView}>
          <View style={style.phoneModelInnerView}>
            <View style={style.phoneModelSearchView}>
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
              contentContainerStyle={style.phoneModelFlatListContainerStyle}
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
                    style={style.phoneModelMenuText}>
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
};
