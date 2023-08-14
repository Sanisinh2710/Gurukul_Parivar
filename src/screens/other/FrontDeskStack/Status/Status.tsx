import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {CustomFonts, QuizStatus} from '../../../../utils';
import {styles} from './styles';

export const Status = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t, i18n} = useTranslation();
  const style = styles();

  const commonstyle = CommonStyle();

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'Status'}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {},
        }}
      />
      <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={QuizStatus}
          renderItem={item => (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(172, 43, 49, 0.3)',
                  backgroundColor: 'white',
                }}>
                <View style={{marginLeft: 20, justifyContent: 'center'}}>
                  <Text
                    style={{
                      ...CustomFonts.body.medium12,
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {item.item.date}
                  </Text>
                </View>
                <View>
                  <Progress.Circle
                    size={40}
                    indeterminate={false}
                    animated={true}
                    progress={item.item.percent / 100}
                    color={
                      item.item.percent >= 51
                        ? 'rgba(0, 166, 88, 1)'
                        : 'rgba(255, 48, 48, 1)'
                    }
                    borderWidth={0}
                    unfilledColor={'rgba(230, 230, 230, 1)'}
                    thickness={5}
                    showsText={true}
                    fill={'none'}
                    textStyle={style.progressText}
                    formatText={progress => (
                      <Text>{Math.floor(progress * 100)}</Text>
                    )}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};
