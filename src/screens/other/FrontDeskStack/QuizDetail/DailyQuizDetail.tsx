import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {
  PrimaryButton,
  RadioLable,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {COLORS, CustomFonts, Quiz} from '../../../../utils';
import LinearGradient from 'react-native-linear-gradient';

export const DailyQuizDetail = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {t, i18n} = useTranslation();
  const style = styles();
  const [selectedItem, setselectedItem] = React.useState<string>('');
  console.log(selectedItem);
  const commonstyle = CommonStyle();

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
            <>
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
              <View>
                <RadioLable
                  dailyQuiz={true}
                  wantFullSpace={false}
                  customStyle={{
                    borderRadius: 60,
                    height: 40,
                    borderWidth: 0,
                  }}
                  selectedItem={selectedItem}
                  setselectedItem={setselectedItem}
                  heading={''}
                  list={[
                    {name: item.answerOptions[0].answerText},
                    {name: item.answerOptions[1].answerText},
                    {name: item.answerOptions[2].answerText},
                    {name: item.answerOptions[3].answerText},
                  ]}
                />
              </View>
            </>
          )}
        />
        <View style={{paddingBottom: '5%', marginTop: '5%'}}>
          <PrimaryButton title="Submit" onPress={() => {}} />
        </View>
      </View>
    </ScreenWrapper>
  );
};
