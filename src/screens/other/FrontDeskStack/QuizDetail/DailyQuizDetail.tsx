import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {COLORS, CustomFonts, Quiz} from '../../../../utils';
import {styles} from './styles';
import {DailyQuizAnswerPostApi, DailyQuizGetApi} from '../../../../services';
export const DailyQuizDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyQuizDetail'>) => {
  const style = styles();
  const Quizid = route.params.id;
  const [answer, setAnswer] = React.useState<Array<Object>>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = React.useState<Array<number>>([]);
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

    console.log(finalData);
    const response = await DailyQuizAnswerPostApi(finalData);
    console.log(response.data);
    if (response.resType === 'SUCCESS') {
      const Marks = Math.floor((response.data.result / Quiz.length) * 100);
      navigation.navigate('QuizResult', {marks: Marks});
    }
  };
  const handleAnswer = (
    options: string,
    index: number,
    opIndex: number,
    correctIndex: number,
    questionId: number,
  ) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = options;
    setSelectedOptions(newSelectedOptions);

    // const isCorrect = opIndex === correctIndex;

    // if (isCorrect && correctAnswer.indexOf(Questionnumber) === -1) {
    //   setCorrectAnswer([...correctAnswer, Questionnumber]);
    // } else {
    //   const correct = [...correctAnswer];
    //   correct.splice(Questionnumber, 1);
    //   setCorrectAnswer(correct);
    // }

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

      const newdata = newData.map((data: any) => {
        if (data.question_id === questionId) {
          data.option = options;
        }
        return data;
      });

      setAnswer(newData);
    }
  };
  console.log(answer, 'Answer State');
  console.log(selectedOptions, 'Selected State');
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
          onPress: () => {},
        }}
      />
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
                          handleAnswer(
                            options,
                            index,
                            opIndex,
                            item.correctIndex,
                            item.id,
                          );
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
            onPress={
              async () => await handleSubmit()
              // navigation.navigate('QuizResult', {marks: Marks});
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
