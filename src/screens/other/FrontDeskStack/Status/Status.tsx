import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
  const style = styles();

  const commonstyle = CommonStyle();

  const handleProgress = (progress: number) => {
    if (progress > 0) {
      console.log(progress);

      return <Text>{`${Math.round((1 / progress) * 5)}%`}</Text>;
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
          renderItem={({item, index}) => (
            <>
              {console.log(item.percent)}
              <TouchableOpacity onPress={() => {}}>
                <View style={style.container}>
                  <View style={{marginLeft: 20, justifyContent: 'center'}}>
                    <Text
                      style={{
                        ...CustomFonts.body.medium12,
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {item.date}
                    </Text>
                  </View>
                  <View>
                    <Progress.Circle
                      size={40}
                      indeterminate={false}
                      animated={true}
                      progress={item.percent && item.percent}
                      color={
                        item.percent >= 51
                          ? 'rgba(0, 166, 88, 1)'
                          : 'rgba(255, 48, 48, 1)'
                      }
                      borderWidth={0}
                      unfilledColor={'rgba(230, 230, 230, 1)'}
                      thickness={5}
                      showsText={true}
                      fill={'none'}
                      textStyle={style.progressText}
                      formatText={(progress: number) =>
                        handleProgress(progress)
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};
