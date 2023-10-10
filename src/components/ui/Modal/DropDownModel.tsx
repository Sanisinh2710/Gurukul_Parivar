import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Modal,
  Text,
  TextInput,
  View,
} from 'react-native';

import {AllIcons} from '@assets';
import {PrimaryButton} from '@components';
import {
  COLORS,
  CustomFonts,
  isObject,
  isObjectArray,
  isString,
  isStringArray,
} from '@utils';
import {Image} from 'react-native';
import {ModalStyle} from './style';

type DropDownModelProps = {
  modelVisible: boolean;
  isCamera?: boolean;
  setModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputList?: Array<string> | Array<object>;
  wantSearchBar?: boolean;
  wantResetButton?: boolean;
  type: 'phone' | 'radio' | 'multi-select' | 'simple' | 'none';
  selectedItem?: any;
  setSelectedItem?: any;
  modalHeight: string;
  label?: string;
  customModelchild?: React.JSX.Element;
  modelValuechoosed?: any;
  setModelValueChoosed?: React.Dispatch<React.SetStateAction<boolean>>;
  wantApplyButton?: boolean;
  viewPhoto?: boolean;
};

export const DropDownModel = React.memo((props: DropDownModelProps) => {
  const {
    modelVisible,
    setModelVisible,
    inputList,
    wantSearchBar,
    wantResetButton,
    type,
    selectedItem,
    setSelectedItem,
    modalHeight,
    label,
    customModelchild,
    setModelValueChoosed,
    wantApplyButton,
    viewPhoto,
    isCamera,
  } = props;
  const style = ModalStyle(modalHeight);

  const {t} = useTranslation();

  const {height} = Dimensions.get('window');

  const touchY = React.useRef<any>();

  const [local, setLocal] = React.useState<string[]>([]);

  const [searchvalue, setSearch] = React.useState('');

  const [searchedData, setSearchedData] = React.useState<
    Array<string> | Array<object>
  >(inputList ?? []);

  React.useEffect(() => {
    setSearchedData(inputList ?? searchedData);
  }, [inputList]);

  React.useEffect(() => {
    if (selectedItem && wantApplyButton) {
      if (selectedItem.length <= 0 && wantApplyButton) {
        setLocal([]);
      }
      if (selectedItem.length > 0 && wantApplyButton) {
        setLocal(selectedItem);
      }
    }
  }, [selectedItem]);

  React.useEffect(() => {
    if (inputList) {
      if (isStringArray(inputList)) {
        let temp = [...inputList];

        if (
          searchvalue !== null &&
          searchvalue !== undefined &&
          searchvalue !== ''
        ) {
          let abc = temp.filter((mainitem: string) => {
            if (
              mainitem
                .toString()
                .toLowerCase()
                .includes(searchvalue.trim().toLowerCase())
            ) {
              return mainitem;
            }
          });
          setSearchedData(abc);
        } else {
          setSearchedData([...inputList]);
        }
      }
      if (isObjectArray(inputList)) {
        let temp = [...inputList];

        if (
          searchvalue !== null &&
          searchvalue !== undefined &&
          searchvalue !== ''
        ) {
          let abc = temp.filter((mainitem: any) =>
            Object.keys(mainitem).some((column: any) => {
              if (
                mainitem[column]
                  .toString()
                  .toLowerCase()
                  .includes(searchvalue.trim().toLowerCase())
              ) {
                return mainitem;
              }
            }),
          );

          setSearchedData(abc);
        } else {
          setSearchedData([...inputList]);
        }
      }
    }
  }, [searchvalue]);

  const onItemClick = (item: any) => {
    if (isObject(item)) {
      if (setSelectedItem) {
        if (type === 'multi-select') {
          const newArr = wantApplyButton ? [...local] : [...selectedItem];
          if (
            newArr.find(newitem => {
              return newitem === item?.id;
            }) === undefined
          ) {
            newArr.push(item.id);

            if (wantApplyButton && wantApplyButton !== undefined) {
              setLocal(newArr);
            } else {
              setSelectedItem(newArr);
            }
          }
        } else {
          if (wantApplyButton && wantApplyButton !== undefined) {
            setLocal(item?.id);
          } else {
            setSelectedItem(item?.id);
          }
        }
        if (setModelValueChoosed) {
          setModelValueChoosed(true);
        }
      }
    } else {
      if (setSelectedItem) {
        if (type === 'multi-select') {
          const newArr = wantApplyButton ? [...local] : [...selectedItem];
          if (newArr.includes(item) === false) {
            newArr.push(item);

            if (wantApplyButton && wantApplyButton !== undefined) {
              setLocal(newArr);
            } else {
              setSelectedItem(newArr);
            }
          }
        } else {
          if (wantApplyButton && wantApplyButton !== undefined) {
            setLocal(item);
          } else {
            setSelectedItem(item);
          }
        }
        if (setModelValueChoosed) {
          setModelValueChoosed(true);
        }
      }
    }
    if (type !== 'multi-select') {
      const timer = setTimeout(() => {
        setModelVisible(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  };

  const onResetPress = () => {
    if (Array.isArray(selectedItem) && type === 'multi-select') {
      setSelectedItem([]);
      setLocal([]);
    } else {
      setSelectedItem('');
    }
  };

  const onCloserViewClicked = (e: GestureResponderEvent) => {
    if (touchY.current - e.nativeEvent.pageY <= -1) {
      setModelVisible(false);
    } else {
      setModelVisible(false);
    }
  };

  return (
    <Modal transparent visible={modelVisible} animationType="fade">
      <View
        style={style.modelWholeView}
        onTouchEnd={() => {
          if (!isCamera) setModelVisible(false);
        }}>
        <View
          style={
            viewPhoto ? style.modelViewPhotoMainView : style.modelMainView
          }>
          <View
            style={style.modelCloserMainView}
            onTouchStart={e => (touchY.current = e.nativeEvent.pageY)}
            onTouchEnd={onCloserViewClicked}>
            <View style={!viewPhoto && style.modelCloserView} />
          </View>
          {customModelchild ? (
            customModelchild
          ) : (
            <View
              style={style.modelInnerView}
              onTouchEnd={e => {
                e.stopPropagation();
              }}>
              <View>
                {wantResetButton ? (
                  <View style={style.resetBtnView}>
                    <Text style={style.modelLabelText}>{label}</Text>
                    <Text
                      style={style.modelValueResetText}
                      onPress={onResetPress}>
                      {t('common.Reset')}
                    </Text>
                  </View>
                ) : (
                  <Text style={style.modelLabelText}>{label}</Text>
                )}
                {wantSearchBar && (
                  <View style={style.modelSearchView}>
                    <View style={style.iconView}>
                      <Image source={AllIcons.Search} style={style.iconStyle} />
                    </View>
                    <TextInput
                      value={searchvalue}
                      placeholder={t('common.Search')}
                      placeholderTextColor={COLORS.lightModetextColor}
                      style={[style.formTextInput, {width: '80%'}]}
                      onChangeText={val => {
                        setSearch(val);
                      }}
                    />
                  </View>
                )}
                <View
                  style={{
                    height: wantApplyButton ? height * 0.43 : 'auto',
                  }}>
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[
                      style.modelFlatListContainerStyle,
                      {
                        paddingBottom: '40%',
                      },
                    ]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={wantSearchBar ? searchedData : inputList}
                    renderItem={({item, index}: any) => {
                      return (
                        <View
                          onTouchEnd={() => onItemClick(item)}
                          style={[
                            style.modelMenuView,
                            type === 'radio' && {
                              borderColor: 'rgba(172, 43, 49, 0.4)',
                              borderWidth: 1,
                              borderRadius: 8,
                              paddingLeft: 16,
                              paddingVertical: 17,
                            },
                            isString(item)
                              ? type === 'radio' &&
                                selectedItem?.includes(item) &&
                                item.includes(selectedItem) && {
                                  backgroundColor: 'rgba(172, 43, 49, 0.1)',
                                }
                              : type === 'radio' &&
                                selectedItem === item?.id &&
                                item?.name.includes(selectedItem) && {
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
                              ((isString(item) && selectedItem === item) ||
                                (isString(item) &&
                                  type === 'phone' &&
                                  item.includes(selectedItem)) ||
                                (isString(item) &&
                                  type === 'multi-select' &&
                                  (selectedItem.includes(item) ||
                                    local.includes(item)))) &&
                                type !== 'radio' && {
                                  color: COLORS.primaryColor,
                                },

                              ((isObject(item) && selectedItem === item?.id) ||
                                (isObject(item) &&
                                  type === 'phone' &&
                                  item?.name.includes(selectedItem)) ||
                                (isObject(item) &&
                                  type === 'multi-select' &&
                                  (selectedItem.includes(item?.id) ||
                                    local.includes(item?.id)))) &&
                                type !== 'radio' && {
                                  color: COLORS.primaryColor,
                                },
                            ]}>
                            {isString(item) ? item : item?.name}
                          </Text>
                          <View>
                            {isString(item) ? (
                              (selectedItem === item ||
                                (type === 'phone' &&
                                  item.includes(selectedItem)) ||
                                (type === 'multi-select' &&
                                  (selectedItem.includes(item) ||
                                    local.includes(item)))) &&
                              type !== 'radio' ? (
                                <View style={style.iconView}>
                                  <Image
                                    source={AllIcons.RoundCheckedCircle}
                                    style={style.iconStyle}
                                  />
                                </View>
                              ) : (
                                type === 'radio' &&
                                (selectedItem === item ||
                                  item === selectedItem) && (
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
                              )
                            ) : (selectedItem === item?.id ||
                                (type === 'phone' &&
                                  item?.name.includes(selectedItem)) ||
                                (type === 'multi-select' &&
                                  (selectedItem.includes(item?.id) ||
                                    local.includes(item?.id)))) &&
                              type !== 'radio' ? (
                              <View style={style.iconView}>
                                <Image
                                  source={AllIcons.RoundCheckedCircle}
                                  style={style.iconStyle}
                                />
                              </View>
                            ) : (
                              type === 'radio' &&
                              (selectedItem === item?.id ||
                                item?.name.includes(selectedItem)) && (
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
                        </View>
                      );
                    }}
                  />
                </View>

                {wantApplyButton && (
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <PrimaryButton
                      title={'Apply'}
                      onPress={() => {
                        setSelectedItem(local);
                        setModelVisible(false);
                      }}
                      buttonStyle={{
                        alignSelf: 'center',
                        backgroundColor: 'red',
                        width: '100%',
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});
