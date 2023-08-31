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
export const DailyQuizDetail = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [answer, setAnswer] = React.useState<Array<Object>>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = React.useState<Array<number>>([]);
  const commonstyle = CommonStyle();
  const {t} = useTranslation();

  const Marks = Math.floor((correctAnswer.length / Quiz.length) * 100);
  const handleAnswer = (
    options: string,
    Questionnumber: number,
    opIndex: number,
    correctIndex: number,
  ) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[Questionnumber] = opIndex;
    setSelectedOptions(newSelectedOptions);

    const isCorrect = opIndex === correctIndex;

    if (isCorrect && correctAnswer.indexOf(Questionnumber) === -1) {
      setCorrectAnswer([...correctAnswer, Questionnumber]);
    } else {
      const correct = [...correctAnswer];
      correct.splice(Questionnumber, 1);
      setCorrectAnswer(correct);
    }

    if (answer.length === 0) {
      setAnswer([{questionNumber: Questionnumber, optionIndex: opIndex}]);
    } else {
      const obj = [...answer];

      let newData = [...obj];

      if (
        newData.some((data: any) => data.questionNumber === Questionnumber) ===
        false
      ) {
        newData.push({questionNumber: Questionnumber, optionIndex: opIndex});
      }

      const newdata = newData.map((data: any) => {
        if (data.questionNumber === Questionnumber) {
          data.optionIndex = opIndex;
        }
        return data;
      });

      setAnswer(newData);
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
          onPress: () => {},
        }}
      />
      <View style={[commonstyle.commonContentView, {flex: 1}]}>
        <FlatList
          data={Quiz}
          renderItem={({item, index}) => (
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
                      {item.questionText}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {item.answerOptions.map((options, opIndex) => {
                  const isSelected = selectedOptions[index] === opIndex;

                  return (
                    <Pressable
                      key={opIndex}
                      onPress={() => {
                        handleAnswer(
                          options,
                          index,
                          opIndex,
                          item.correctIndex,
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
          )}
        />
        <View style={{paddingBottom: '5%', marginTop: '5%'}}>
          <PrimaryButton
            title={t('DailyQuiz.SubmitBtn')}
            onPress={() => {
              navigation.navigate('QuizResult', {marks: Marks});
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
