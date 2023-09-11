import React from 'react';

import {BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  Loader,
  NoData,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {DailyQuizGetApi} from '../../../../services';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';

export const DailyQuiz = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [Data, setData] = React.useState<{[key: string]: any}[]>([]);

  const {t, i18n} = useTranslation();
  const style = styles();
  const commonstyle = CommonStyle();

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyQuizGetApi(undefined);

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
        headerTitle={t('DailyQuiz.Heading')}
        headerRight={{
          icon: AllIcons.ChartQuiz,
          onPress: () => {
            navigation.navigate('status');
          },
        }}
      />
      {loader ? (
        <Loader screenHeight={'90%'} />
      ) : Data.length > 0 ? (
        <ScrollView
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '10%'}}>
          <View style={[commonstyle.commonContentView, {flex: 1}]}>
            <Image
              source={{uri: `${BASE_URL}${Data[0].image}`}}
              style={{
                height: Dimensions.get('window').height * 0.9,
                width: '100%',
              }}
            />
            <View style={{marginTop: 20, paddingBottom: 10}}>
              <PrimaryButton
                onPress={() => {
                  navigation.replace('dailyQuizDetail', {id: Data[0].id});
                }}
                title={t('DailyQuiz.NxtBtn')}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <NoData />
      )}
    </ScreenWrapper>
  );
};
