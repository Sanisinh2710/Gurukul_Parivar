import React from 'react';

import {BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {CommonStyle} from '../../../../../assets/styles';
import {Loader, ScreenHeader, ScreenWrapper} from '../../../../components';
import {DailyProgramProps} from '../../../../types';
import {COLORS, CustomFonts} from '../../../../utils';
import {DailyProgramGetApi} from '../../../../services';

export const DailyProgram = ({
  navigation,
}: DailyProgramProps): React.JSX.Element => {
  const {t} = useTranslation();

  const commonStyle = CommonStyle();
  const [loader, setLoader] = React.useState<boolean>(false);

  const [DailyProgramData, setDailyProgramData] = React.useState<
    {
      title: string;
      description: string;
      image: string;
    }[]
  >([]);

  React.useMemo(async () => {
    setLoader(true);
    try {
      const res = await DailyProgramGetApi();

      if (res.resType === 'SUCCESS') {
        setTimeout(() => {
          setDailyProgramData(res.data.daily_programs);
          setLoader(false);
        }, 1000);
      } else {
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
        headerTitle={t('homeScreen.DailyProgram')}
      />
      <View style={[commonStyle.commonContentView, {flex: 1}]}>
        {loader ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              marginTop: '10%',
            }}
            data={DailyProgramData}
            renderItem={({item, index}) => {
              return (
                <>
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
                            height: 40,
                            width: 40,
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
                </>
              );
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};
