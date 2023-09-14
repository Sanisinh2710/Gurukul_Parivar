import React from 'react';
import {View, Image, TextInput} from 'react-native';
import {ScreenWrapper} from '../../ui';
import {styles} from './style';
import {AllIcons} from '../../../../assets/icons';
import {COLORS} from '../../../utils';
import { useTranslation } from 'react-i18next';

type SearchBarPropType = {
dataForSearch : Array<object>
setSearchData : React.Dispatch<React.SetStateAction<object[]>>
}

export const SearchBar = ({dataForSearch , setSearchData}:SearchBarPropType) => {
  const style = styles();

  const [searchVal, setSearchVal] = React.useState('');
  const {t} = useTranslation();
  React.useEffect(() => {
    const data = setTimeout(() => {
      if (searchVal !== null && searchVal !== undefined && searchVal !== '') {
        const filterData = dataForSearch.filter((item:any) => {
           return  Object.keys(item).some((column: any) => {
                if(column != 'id' && column != 'url')
                {
                if (
                    item[column]
                    .toString()
                    .toLowerCase()
                    .trim()
                    .includes(searchVal.trim().toLowerCase())
                ) {
                  return item;
                }
            }
              },
            );
        });
            setSearchData(filterData);
      } else {
        setSearchData(dataForSearch);
      }
    }, 800);
    return () => clearTimeout(data);
  }, [searchVal]);
  return (
    
      <View style={style.modelSearchView}>
        <View style={style.iconView}>
          <Image source={AllIcons.Search} style={style.iconStyle} />
        </View>
        <TextInput
          value={searchVal}
          placeholder={t('common.Search')}
          placeholderTextColor={COLORS.lightModetextColor}
          style={[style.formTextInput, {width: '80%'}]}
          onChangeText={val => {
            return setSearchVal(val);
          }}
        />
      </View>
   
  );
};
