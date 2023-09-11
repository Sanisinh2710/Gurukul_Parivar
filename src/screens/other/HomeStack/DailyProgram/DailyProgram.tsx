import React from 'react';

import {BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {ScreenHeader, ScreenWrapper} from '../../../../components';
import {DailyProgramProps} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';

export const DailyProgram = ({
  navigation,
}: DailyProgramProps): React.JSX.Element => {
  const {t} = useTranslation();

  const commonStyle = CommonStyle();

  const [DailyProgramData, setDailyProgramData] = React.useState<
    {
      title: string;
      description: string;
      image: string;
    }[]
  >([]);

  React.useMemo(() => {
    const backData = {
      data: {
        daily_programs: [
          {
            title: 'પધરામણી',
            description: `<html>
            <head>
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0px;
                        margin-top: 35px;
                        background-color: transparent;
                    }
            
                    .container {
                        margin: 0 auto;
                        max-width: 1170px;
                        padding: 0 50px;
                    }
            
                    .padhramani .text-wrapper {
                        font-family: "Satoshi-Bold", Helvetica;
                        font-weight: 700;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .p {
                        font-family: "Satoshi-Bold", Helvetica;
                        font-weight: 400;
                        color: transparent;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .span {
                        font-weight: 700;
                        color: #ac2b31;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-2 {
                        font-family: "Satoshi-Regular", Helvetica;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-3 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-4 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-5 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-6 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-7 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-8 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-9 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-10 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-11 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-12 {
                        font-family: "Satoshi-Bold", Helvetica;
                        font-weight: 700;
                        color: #ac2b31;
                        font-size: 2.5rem;
                    }
            
            
                    .padhramani .text-wrapper-13 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-14 {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: #171717;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-15 {
                        font-family: "Satoshi-Bold", Helvetica;
                        font-weight: 700;
                        color: #ac2b31;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .cover-element {
                        display: inline-flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                        position: absolute;
                    }
            
                    .padhramani .office-no {
                        font-family: "Satoshi-Regular", Helvetica;
                        font-weight: 400;
                        color: transparent;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-16 {
                        color: #000000;
                    }
            
                    .padhramani .text-wrapper-17 {
                        font-family: "Satoshi-Bold", Helvetica;
                        font-weight: 700;
                        color: #ac2b31;
                        font-size: 2.5rem;
                    }
            
                    .padhramani .text-wrapper-18 {
                        position: relative;
                        font-family: "SF Pro Display-Medium", Helvetica;
                        font-weight: 500;
                        color: #000000;
                        font-size: 2.5rem;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <div class="padhramani">
            
                        <p class="p">
                            <span class="span">સામગ્રી: </span>
                            <span class="text-wrapper-2">ઠાકોરજી ને પધરાવવા માટે ટીપાઈ અને આસન, સંતોને બેસવા માટે સોફા /ખુરશી,
                                ઠાકોરજીનો પ્રસાદ, આરતીની સામગ્રી,
                                ફૂલ અને હાર.</span>
                        </p>
                        <div class="text-wrapper-12">પધરામણી ની રીત:</div>

                        <p class="text-wrapper-3">1. સંતો આવે ત્યારે ઠાકોરજી અને સંતો ના સ્વાગત માં જવું.</p>
                        <p class="text-wrapper-4">2. ઠાકોરજી આપણા ઘર માં પધારે ત્યારે ફૂલની પાંખડીઓ થી ઠાકોરજી નું સ્વાગત કરવું.
                        </p>
                        <p class="text-wrapper-5">3. ઠાકોરજી અને સંતોને&nbsp;&nbsp;પ્રણામ/સાષ્ટાંગ દંડવત પ્રણામ કરવા.</p>
                        <div class="text-wrapper-6">4. ઠાકોરજીને ટીપાઈ પર પધરાવવા.</div>
                        <p class="text-wrapper-7">5. ઠાકોરજી ને ફૂલ નો હાર ધરાવવો.</p>
                        <p class="text-wrapper-8">6 .ઠાકોરજી ની આરતી કરવી અને પ્રસાદી ધરાવવી.</p>
                        <p class="text-wrapper-9">7. સંતોને ખુરશી/સોફા પાર બેસાડી સંતોનું પૂજન કરવું.</p>
                        <p class="text-wrapper-10">8. ત્યારબાદ એકાગ્ર ચિતે સંતોના મુખે કથા-વાર્તા <br />&nbsp;&nbsp;&nbsp;&nbsp; સાંભળવી
                        </p>
                        <p class="text-wrapper-11">9. ઠાકોરજી અને સંતોને&nbsp;&nbsp;શેરી /સોસાયટી ના ગેટ સુધી વળાવવા જવું.</p>
                        <div class="group-2">
                        <div class="text-wrapper-15">ખાસ સુચન:</div>

                            <p class="text-wrapper-13">1. સ્ત્રીભક્તો એ બીજા રૂમ માં રહી દર્શન કરવા,સંતો ની સામે ન આવવું.</p>
                            <p class="text-wrapper-14">2. હરીભક્તોએ પોતાના ઘર માં પધરામણી કરાવવા માટે ઓફીસ માં જાણ કરવી .</p>
                        </div>
            
                        <div class="office-no-wrapper">
                            <p class="office-no">
                                <span class="text-wrapper-16">Office No.:- </span> <span class="text-wrapper-17">9099473299</span>
                            </p>
                        </div>
                    </div>
            
                </div>
            </body>
            
            </html>`,
            image: '/storage/DailyProgram/xJ9I7zem.jpeg',
          },
          {
            title: 'મહાપૂજા',
            description: '<p>fdsfds</p>',
            image: '/storage/DailyProgram/F4hJohPb.jpeg',
          },
        ],
      },
      status: 'success',
      code: 200,
      message: '',
      toast: false,
    };

    setDailyProgramData(backData.data.daily_programs);
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        headerTitleAlign={'left'}
        leftOnPress={() => {
          navigation.goBack();
        }}
        headerTitle={t('homeScreen.DailyProgram')}
      />
      <View style={commonStyle.commonContentView}>
        <FlatList
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 15,
            marginTop: '10%',
          }}
          data={DailyProgramData}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('programDetail', {
                    title: item.title,
                    description: item.description,
                  });
                }}
                android_ripple={{
                  color: COLORS.primaryRippleColor,
                  foreground: true,
                }}
                key={item.title + index}
                style={{
                  height: 65,
                  borderRadius: 8,
                  borderWidth: 0.4,
                  borderColor: COLORS.primaryColor,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      padding: 8,
                      borderRadius: 6,
                    }}>
                    <Image
                      source={{uri: `${BASE_URL}${item.image}`}}
                      style={{
                        flex: 1,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      ...CustomFonts.header.medium20,
                      color: COLORS.lightModetextColor,
                      fontSize: 16,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
