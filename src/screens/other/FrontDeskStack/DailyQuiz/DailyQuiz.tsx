import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import {AllIcons} from '../../../../../assets/icons';
import {AllImages} from '../../../../../assets/images';
import {CommonStyle} from '../../../../../assets/styles';
import {
  DropDownModel,
  Loader,
  NoData,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {RootStackParamList} from '../../../../types';
import {styles} from './styles';
import {DailyQuizGetApi} from '../../../../services';
import {BASE_URL} from '@env';
import {CustomFonts} from '../../../../utils';

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
  console.log(Data);
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
        <Loader screenHeight={'100%'} />
      ) : Data.length > 0 ? (
        Data[0].hasAttend === false ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '10%'}}>
            <View style={[commonstyle.commonContentView, {flex: 1}]}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.5,
                  width: '100%',
                }}>
                <Image
                  source={AllImages.Rectangle68}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              {Data[0].description && (
                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      ...CustomFonts.header.small18,
                      fontSize: 20,
                      color: 'black',
                    }}>
                    Description
                  </Text>
                  <Text style={{color: 'black', fontSize: 18}}>
                    {Data[0].description}
                  </Text>
                </View>
              )}

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
          <NoData
            title={t('DailyQuiz.hasAttendTitle')}
            content={t('DailyQuiz.hasAttendContent')}
          />
        )
      ) : (
        <NoData />
      )}
    </ScreenWrapper>
  );
};
