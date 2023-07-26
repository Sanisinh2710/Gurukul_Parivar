import React from 'react';

import {useTranslation} from 'react-i18next';
import {FlatList, Modal, Text, TextInput, View} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, CustomFonts} from '../../../utils';
import {ModalStyle} from './style';

type DropDownModelProps = {
  modelVisible: boolean;
  setModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchvalue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  inputList: string[];
  wantSearchBar: boolean;
  type: 'phone' | 'radio' | 'none';
  localVal: string;
  setLocalVal: React.Dispatch<React.SetStateAction<string>>;
  modalHeight: string;
  label: string;
};

export const DropDownModel = ({
  modelVisible,
  setModelVisible,
  searchvalue,
  setSearchValue,
  inputList,
  wantSearchBar,
  type,
  localVal,
  setLocalVal,
  modalHeight,
  label,
}: DropDownModelProps) => {
  const style = ModalStyle(modalHeight);

  const {t} = useTranslation();

  const touchY = React.useRef<any>();

  return (
    <Modal
      transparent
      visible={modelVisible}
      animationType="fade"
      onDismiss={() => {
        setModelVisible(false);
      }}>
      <View style={style.modelWholeView}>
        <View style={style.modelMainView}>
          <View
            style={style.modelCloserMainView}
            onTouchStart={e => (touchY.current = e.nativeEvent.pageY)}
            onTouchEnd={e => {
              if (touchY.current - e.nativeEvent.pageY <= -1) {
                setModelVisible(false);
              } else {
                setModelVisible(false);
              }
            }}>
            <View style={style.modelCloserView} />
          </View>
          <View style={style.modelInnerView}>
            <Text style={style.modelLabelText}>{label}</Text>
            {wantSearchBar && (
              <View style={style.modelSearchView}>
                <MaterialCommunityIcon
                  name="magnify"
                  size={25}
                  color={COLORS.lightModetextColor}
                />
                <TextInput
                  value={searchvalue}
                  placeholder={t('common:Search')}
                  placeholderTextColor={COLORS.lightModetextColor}
                  style={[style.formTextInput, {width: '80%'}]}
                  onChangeText={val => {
                    if (setSearchValue) {
                      setSearchValue(val);
                    }
                  }}
                />
              </View>
            )}
            <FlatList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={style.modelFlatListContainerStyle}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={inputList}
              renderItem={({item, index}) => {
                return (
                  <View
                    onTouchEnd={() => {
                      if (type === 'phone') {
                        const newItem =
                          item.split(' ').at(0) + ' ' + item.split(' ').at(1);
                        setLocalVal(newItem);
                      } else {
                        setLocalVal(item);
                      }
                    }}
                    style={[
                      style.modelMenuView,
                      type === 'radio' && {
                        borderColor: 'rgba(172, 43, 49, 0.4)',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 16,
                        paddingVertical: 17,
                      },
                      type === 'radio' &&
                        localVal === item && {
                          backgroundColor: 'rgba(172, 43, 49, 0.1)',
                        },
                    ]}>
                    <Text
                      style={[
                        style.modelMenuText,
                        type === 'radio' && {
                          ...CustomFonts.body.large14,
                          paddingBottom: 0,
                          fontWeight: '500',
                          fontSize: 16,
                          color: COLORS.lightModetextColor,
                        },
                        type === 'phone'
                          ? localVal ===
                              item.split(' ').at(0) +
                                ' ' +
                                item.split(' ').at(1) && {color: 'red'}
                          : localVal === item &&
                            type !== 'radio' && {color: 'red'},
                      ]}>
                      {item}
                    </Text>
                    {type === 'phone' ? (
                      localVal ===
                        item.split(' ').at(0) + ' ' + item.split(' ').at(1) && (
                        <MaterialCommunityIcon
                          name="check-circle-outline"
                          size={25}
                          color={'red'}
                        />
                      )
                    ) : localVal === item && type !== 'radio' ? (
                      <MaterialCommunityIcon
                        name="check-circle-outline"
                        size={25}
                        color={'red'}
                      />
                    ) : (
                      type === 'radio' &&
                      localVal === item && (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderColor: COLORS.primaryColor,
                            borderWidth: 1,
                            borderRadius: 60,
                            padding: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: 16,
                          }}>
                          <View
                            style={{
                              backgroundColor: COLORS.primaryColor,
                              borderRadius: 60,
                              width: 12,
                              height: 12,
                            }}
                          />
                        </View>
                      )
                    )}
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
