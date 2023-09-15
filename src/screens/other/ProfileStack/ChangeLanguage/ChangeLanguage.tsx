import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {storage} from '../../../../storage';
import {RootAuthStackParamList, RootStackParamList} from '../../../../types';
import {COLORS, Languages} from '../../../../utils';
import {styles} from './styles';

export const ChangeLanguage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = React.useState(Languages[i18n.language]);
  const style = styles();

  const commonstyle = CommonStyle();

  React.useEffect(() => {
    if (language) {
      for (let lang in Languages) {
        if (language === Languages[lang]) {
          i18n.changeLanguage(lang);
          storage.set('langCode', JSON.stringify(lang));
          break;
        }
      }
    }
  }, [language]);
  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('ChangeLanguage.Heading')}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
        <>
          {Object.entries(Languages).map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              onPress={() => {
                setLanguage(item[1]);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  padding: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(172, 43, 49, 0.3)',
                  backgroundColor: 'white',
                }}>
                <View style={{marginLeft: 20}}>
                  <Text style={{fontSize: 16, color: 'black'}}>{item[1]}</Text>
                </View>
                <View
                  style={
                    item[1] === language
                      ? style.selectedStyles
                      : style.unselectedStyles
                  }>
                  {item[1] === language && (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 60,
                        backgroundColor: COLORS.primaryColor,
                      }}></View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      </View>
    </ScreenWrapper>
  );
};
