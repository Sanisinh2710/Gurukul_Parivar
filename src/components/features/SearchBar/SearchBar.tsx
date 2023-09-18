import React from 'react';

import {useTranslation} from 'react-i18next';
import {Image, StyleProp, TextInput, View, ViewStyle} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {isObjectArray, isStringArray} from '../../../utils';
import {styles} from './style';

type SearchBarPropType = {
  dataForSearch: Array<object>;
  setSearchData: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  searchBarstyle?: StyleProp<ViewStyle>;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar = ({
  dataForSearch,
  setSearchData,
  placeholder,
  searchBarstyle,
  setIsSearching,
}: SearchBarPropType): React.JSX.Element => {
  const style = styles();

  const [searchVal, setSearchVal] = React.useState('');
  const {t} = useTranslation();

  
  React.useEffect(() => {
    const data = setTimeout(() => {
      if (isStringArray(dataForSearch)) {
        let temp = [...dataForSearch];

        if (searchVal !== null && searchVal !== undefined && searchVal !== '') {
          const filterData = temp.filter((mainitem: string) => {
            if (
              mainitem
                .toString()
                .toLowerCase()
                .includes(searchVal.trim().toLowerCase())
            ) {
              return mainitem;
            }
          });
          setSearchData(filterData);
        } else {
          setSearchData(temp);
        }
      }
      if (isObjectArray(dataForSearch)) {
        let temp = [...dataForSearch];
        if (searchVal !== null && searchVal !== undefined && searchVal !== '') {
          const filterData = temp.filter((item: any) => {
            return Object.keys(item).some((column: any) => {
              if (
                column != 'id' &&
                column != 'url' &&
                item[column]
                  .toString()
                  .toLowerCase()
                  .trim()
                  .includes(searchVal.trim().toLowerCase())
              ) {
                return item;
              }
            });
          });
          setSearchData(filterData);
        } else {
          setSearchData(temp);
        }
      }
    }, 800);
    return () => clearTimeout(data);
  }, [searchVal]);

  return (
    <>
      <View style={[style.modelSearchView, searchBarstyle]}>
        <View style={style.iconView}>
          <Image source={AllIcons.Search} style={style.iconStyle} />
        </View>
        <TextInput
          value={searchVal}
          placeholder={placeholder ? placeholder : t('common.Search')}
          placeholderTextColor={'rgba(23, 23, 23, 0.3)'}
          style={[style.formTextInput, {width: '80%'}]}
          onChangeText={val => {
            return setSearchVal(val);
          }}
        />
      </View>
    </>
  );
};
