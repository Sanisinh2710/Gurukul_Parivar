import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  NoData,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {CustomFonts, QuizStatus} from '../../../../utils';
import {styles} from './styles';
import {DailyQuizStatusApi} from '../../../../services';

export const Status = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const style = styles();
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);
  const commonstyle = CommonStyle();

  const handleProgress = (progress: number) => {
    if (progress > 0) {
      return <Text>{`${Math.round((1 / progress) * 5)}%`}</Text>;
    }
  };
  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuizStatusApi();

      if (res.resType === 'SUCCESS') {
        setData(res.data);
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
        headerTitle={'Status'}
      />
      {loader ? (
        <Loader />
      ) : Data.length > 0 ? (
        <View style={[commonstyle.commonContentView, {flex: 1, marginTop: 25}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item, index}) => {
              let marks = item.score / 100;
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuizHistory', {
                        date: item.created_at,
                        id: item.quiz_id,
                      });
                    }}>
                    <View style={style.container}>
                      <View style={{marginLeft: 20, justifyContent: 'center'}}>
                        <Text
                          style={{
                            ...CustomFonts.body.medium12,
                            fontSize: 16,
                            color: 'black',
                          }}>
                          {item.created_at}
                        </Text>
                      </View>
                      <View>
                        <Progress.Circle
                          size={40}
                          indeterminate={false}
                          animated={true}
                          progress={marks}
                          color={
                            item.score >= 51
                              ? 'rgba(0, 166, 88, 1)'
                              : 'rgba(255, 48, 48, 1)'
                          }
                          borderWidth={0}
                          unfilledColor={'rgba(230, 230, 230, 1)'}
                          thickness={5}
                          showsText={true}
                          fill={'none'}
                          textStyle={style.progressText}
                          formatText={() => {
                            return <Text>{Math.floor(marks * 100)}</Text>;
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      ) : (
        <NoData />
      )}
    </ScreenWrapper>
  );
};
