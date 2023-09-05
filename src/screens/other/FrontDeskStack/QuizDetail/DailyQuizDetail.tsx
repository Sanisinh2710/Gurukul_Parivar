import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts, Quiz} from '../../../../utils';
import {styles} from './styles';
import {
  DailyQuizAnswerPostApi,
  DailyQuizGetApi,
  DailyQuizStatusApi,
} from '../../../../services';
export const DailyQuizDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyQuizDetail'>) => {
  const style = styles();
  const Quizid = route.params.id;
  const [answer, setAnswer] = React.useState<Array<Object>>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const commonstyle = CommonStyle();
  const {t} = useTranslation();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuizGetApi(Quizid);

      if (res.resType === 'SUCCESS') {
        setData(res.data.questions);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async () => {
    let finalData = {
      quiz_id: Quizid,
      answer_log: answer,
    };

    const response = await DailyQuizAnswerPostApi(finalData);
    if (response.resType === 'SUCCESS') {
      navigation.replace('QuizResult', {marks: response.data.score});
    }
  };
  const handleAnswer = (options: string, index: number, questionId: number) => {
    const newSelectedOptions = JSON.parse(JSON.stringify(selectedOptions));
    newSelectedOptions[index] = options;
    setSelectedOptions(newSelectedOptions);

    if (answer.length === 0) {
      setAnswer([{question_id: questionId, option: options}]);
    } else {
      const obj = [...answer];

      let newData = [...obj];

      if (
        newData.some((data: any) => data.question_id === questionId) === false
      ) {
        newData.push({question_id: questionId, option: options});
      }

      const newData1 = newData.map((data: any) => {
        if (data.question_id === questionId) {
          data.option = options;
        }
        return data;
      });

      setAnswer(newData1);
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={'સંત જીવન નુ નામુ'}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {
            navigation.replace('status');
          },
        }}
      />
      {loader ? (
        <Loader />
      ) : (
        <View style={[commonstyle.commonContentView, {flex: 1}]}>
          <FlatList
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
                      const isSelected = selectedOptions[index] === options;

                      return (
                        <Pressable
                          key={opIndex}
                          onPress={() => {
                            handleAnswer(options, index, item.id);
                          }}
                          style={{
                            width: '40%',
                            marginRight: '5%',
                            marginVertical: '3%',
                            padding: 10,
                            borderRadius: 20,
                            backgroundColor: isSelected
                              ? COLORS.primaryColor
                              : 'rgba(172, 43, 49, 0.1)',
                          }}>
                          <View>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: isSelected ? 'white' : 'black',
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
          <View style={{paddingBottom: '5%', marginTop: '5%'}}>
            <PrimaryButton
              title={t('DailyQuiz.SubmitBtn')}
              disabled={answer.length === Data.length ? false : true}
              onPress={
                async () => await handleSubmit()
                // navigation.navigate('QuizResult', {marks: Marks});
              }
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};
