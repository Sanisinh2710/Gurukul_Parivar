import React from 'react';

import {useTranslation} from 'react-i18next';
import {FlatList, Modal, Text, TextInput, View} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, CustomFonts} from '../../../utils';
import {ModalStyle} from './style';

type DropDownModelProps = {
  modelVisible: boolean;
  setModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputList?: string[];
  wantSearchBar?: boolean;
  wantResetButton?: boolean;
  type: 'phone' | 'radio' | 'multi-select' | 'simple' | 'none';
  selectedItem?: any;
  setSelectedItem?: any;
  modalHeight: string;
  label?: string;
  customModelchild?: React.JSX.Element;
};
export const DropDownModel = React.memo(
  ({
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
  }: DropDownModelProps) => {
    const style = ModalStyle(modalHeight);

    const {t} = useTranslation();

    const touchY = React.useRef<any>();

    const [searchvalue, setSearch] = React.useState('');

    const [searchedData, setSearchedData] = React.useState<string[]>([]);

    React.useEffect(() => {
      if (inputList) {
        let temp = [...inputList];

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
          setSearchedData(abc);
        } else {
          setSearchedData([...inputList]);
        }
      }
    }, [searchvalue]);

    return (
      <Modal
        transparent
        visible={modelVisible}
        animationType="slide"
        onDismiss={() => {
          setModelVisible(false);
        }}>
        <View
          style={style.modelWholeView}
          onTouchEnd={() => {
            setModelVisible(false);
          }}>
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
            {customModelchild ? (
              customModelchild
            ) : (
              <View
                style={style.modelInnerView}
                onTouchEnd={e => {
                  e.stopPropagation();
                }}>
                <>
                  {wantResetButton ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={style.modelLabelText}>{label}</Text>
                      <Text
                        style={style.modelValueResetText}
                        onPress={() => {
                          if (setSelectedItem && selectedItem) {
                            if (
                              Array.isArray(
                                selectedItem && type === 'multi-select',
                              )
                            ) {
                              setSelectedItem([]);
                            } else {
                              setSelectedItem('');
                            }
                          }
                        }}>
                        {t('common.Reset')}
                      </Text>
                    </View>
                  ) : (
                    <Text style={style.modelLabelText}>{label}</Text>
                  )}
                  {wantSearchBar && (
                    <View style={style.modelSearchView}>
                      <MaterialCommunityIcon
                        name="magnify"
                        size={25}
                        color={COLORS.lightModetextColor}
                      />
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
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={style.modelFlatListContainerStyle}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={wantSearchBar ? searchedData : inputList}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          onTouchEnd={() => {
                            if (setSelectedItem) {
                              if (
                                Array.isArray(selectedItem) &&
                                type === 'multi-select'
                              ) {
                                const newArr = [...selectedItem];
                                if (newArr.includes(item) === false) {
                                  newArr.push(item);
                                  setSelectedItem(newArr);
                                }
                              } else {
                                setSelectedItem(item);
                              }
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
                              selectedItem?.includes(item) &&
                              item.includes(selectedItem) && {
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
                              (selectedItem?.includes(item) ||
                                (type === 'phone' &&
                                  item.includes(selectedItem))) &&
                                type !== 'radio' && {color: 'red'},
                            ]}>
                            {item}
                          </Text>
                          {(selectedItem?.includes(item) ||
                            (type === 'phone' &&
                              item.includes(selectedItem))) &&
                          type !== 'radio' ? (
                            <MaterialCommunityIcon
                              name="check-circle-outline"
                              size={25}
                              color={'red'}
                            />
                          ) : (
                            type === 'radio' &&
                            (selectedItem?.includes(item) ||
                              item.includes(selectedItem)) && (
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
                </>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  },
);
