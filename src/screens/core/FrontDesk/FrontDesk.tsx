import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {
  Loader,
  PagerView,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {SliderGetApi} from '../../../services';
import {RootStackParamList} from '../../../types';
import {FrontDesk} from '../../../utils';
import {styles} from './styles';

export const FrontDeskScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [dashboardImages, setDashboardImages] = React.useState([]);

  const [loader, setLoader] = React.useState<boolean>(false);

  const style = styles();

  const {t} = useTranslation();
  const commonStyle = CommonStyle();

  React.useMemo(async () => {
    setLoader(true);

    try {
      const res = await SliderGetApi();

      if (res.resType === 'SUCCESS') {
        setDashboardImages(res.data.images);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePress = (val: string) => {
    switch (val) {
      // case 'goform':
      //   navigation.navigate('dailyDarshan');
      //   break;
      case 'connect':
        navigation.navigate('gurkulConnect');
        break;

      case 'quiz':
        navigation.navigate('dailyQuiz');
        break;
      case 'donation':
        navigation.navigate('donation');
        break;

      case 'event':
        navigation.navigate('GurukulEvents');

      default:
        break;
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ScreenWrapper>
          <ScreenHeader
            showLeft={false}
            headerTitleAlign={'left'}
            customTitle={
              <View>
                <Text style={style.title}>{t('frontDesk.Heading')}</Text>
              </View>
            }
            headerRight={{
              icon: AllIcons.NotificationOutline,
              onPress: () => {},
            }}
          />
          <View
            style={{
              marginBottom: '2%',
            }}>
            <PagerView
              images={dashboardImages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </View>
          <View style={[{flex: 1}]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                {
                  marginTop: '5%',
                  paddingBottom: '30%',
                },
                commonStyle.commonContentView,
              ]}
              data={FrontDesk(t)}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handlePress(item.id);
                    }}>
                    <View style={style.flatListContainer}>
                      <View
                        style={[
                          style.imageContainer,
                          {backgroundColor: item.imageBG},
                        ]}>
                        <Image
                          source={item.image}
                          style={{height: 24, width: 24}}
                        />
                      </View>
                      <View
                        style={{justifyContent: 'center', marginLeft: '2%'}}>
                        <Text style={style.listTitle}>{item.title} </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScreenWrapper>
      )}
    </>
  );
};
