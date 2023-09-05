import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts, Quiz} from '../../../../utils';
import {styles} from './styles';
import {DailyQuizHistoryGetApi} from '../../../../services';
export const QuizHistory = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'QuizHistory'>) => {
  const style = styles();
  const Quizid = route.params.id;
  const Date = route.params.date;
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const commonstyle = CommonStyle();
  const {t} = useTranslation();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuizHistoryGetApi(Quizid);

      if (res.resType === 'SUCCESS') {
        setData(res.data.questions);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={Date}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        {loader ? (
          <Loader />
        ) : Data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '10%'}}
            data={Data}
            renderItem={({item, index}) => (
              <>
                <View>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.05)', 'rgba(23, 23, 23, 0)']}
                    locations={[0, 1]}
                    useAngle={true}
                    style={{
                      marginTop: '10%',
                      flex: 1,
                      height: 40,
                      borderTopLeftRadius: 3,
                      borderBottomLeftRadius: 3,
                    }}>
                    <View style={{flexDirection: 'row', height: '100%'}}>
                      <View
                        style={{
                          width: '5%',
                          borderLeftWidth: 7,
                          borderTopLeftRadius: 3,
                          borderBottomLeftRadius: 3,
                          borderColor: COLORS.primaryColor,
                        }}
                      />
                      <View style={{width: '95%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            ...CustomFonts.header.small18,
                            color: 'black',
                            fontSize: 14,
                          }}>
                          {item.question}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {item.options.map((options: any, opIndex: number) => {
                      const isSelected = item.selected === options;
                      const isCorrect = item.correct === options;

                      return (
                        <Pressable
                          key={opIndex}
                          style={{
                            width: '40%',
                            marginRight: '5%',
                            marginVertical: '3%',
                            padding: 10,
                            borderRadius: 20,
                            backgroundColor:
                              isSelected && isCorrect
                                ? 'rgba(0, 166, 88, 1)'
                                : isCorrect
                                ? 'rgba(0, 166, 88, 1)'
                                : isSelected
                                ? COLORS.primaryColor
                                : 'rgba(172, 43, 49, 0.1)',
                          }}>
                          <View>
                            <Text
                              style={{
                                textAlign: 'center',
                                color:
                                  isSelected || isCorrect ? 'white' : 'black',
                              }}>
                              {options}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </>
            )}
          />
        ) : (
          <NoData />
        )}
      </View>
    </ScreenWrapper>
  );
};
