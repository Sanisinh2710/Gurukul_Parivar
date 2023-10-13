import React from 'react';

import {AllIcons, CommonStyle} from '@assets';
import {
  Loader,
  NoData,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DailyQuizAnswerPostApi, DailyQuizGetApi} from '@services';
import {RootStackParamList} from '@types';
import {COLORS} from '@utils';
import {useTranslation} from 'react-i18next';
import {FlatList, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';

export const DailyQuizDetail = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'dailyQuizDetail'>) => {
  const style = styles();
  const [answer, setAnswer] = React.useState<Array<Object>>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const commonstyle = CommonStyle();
  const {t} = useTranslation();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuizGetApi(undefined);

      if (res.resType === 'SUCCESS' && res.statusCode === 200) {
        setData(res.data);
        setLoader(false);
      } else if (res.statusCode === 400) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async () => {
    let finalData = {
      answer_log: answer,
    };

    const response = await DailyQuizAnswerPostApi(finalData);
    console.log(response, 'RESPONSE POST API');
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
        <View style={{flex: 1}}>
          <Loader screenHeight={'100%'} />
        </View>
      ) : Data.length > 0 ? (
        <View style={[commonstyle.commonContentView, {flex: 1}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item, index}) => (
              <>
                <View>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.05)', 'rgba(23, 23, 23, 0)']}
                    locations={[0, 1]}
                    useAngle={true}
                    style={style.linearGradient}>
                    <View style={style.leftQueBarContainer}>
                      <View style={style.leftQueBar} />
                      <View style={style.QueContainer}>
                        <Text style={style.Que}>{item.question}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <View style={style.mapWrapper}>
                    {item.options.map((options: any, opIndex: number) => {
                      const isSelected = selectedOptions[index] === options;

                      return (
                        <Pressable
                          key={opIndex}
                          onPress={() => {
                            handleAnswer(options, index, item.id);
                          }}
                          style={[
                            style.option,
                            {
                              backgroundColor: isSelected
                                ? COLORS.primaryColor
                                : 'rgba(172, 43, 49, 0.1)',
                            },
                          ]}>
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
          <View style={style.btnWrapper}>
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
      ) : (
        <NoData
          title={t('DailyQuiz.hasAttendTitle')}
          content={t('DailyQuiz.hasAttendContent')}
        />
      )}
    </ScreenWrapper>
  );
};
