import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {RootStackParamList} from '../../../types';
import {AllImages} from '../../../../assets/images';
import {FrontDesk} from '../../../utils';
import {styles} from './styles';
import {SliderGetApi} from '../../../services';

export const FrontDeskScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [dashboardImages, setDashboardImages] = React.useState([]);
  const [loader, setLoader] = React.useState<boolean>(false);

  const style = styles();
  const TouchX = React.useRef<any>();

  const {t} = useTranslation();
  const commonStyle = CommonStyle();
  const handlePress = (val: string) => {
    switch (val) {
      // case 'goform':
      //   navigation.navigate('dailyDarshan');
      //   break;
      // case 'speech':
      //   navigation.navigate('dailyQuotes');
      //   break;

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
  const handlePageChange = () => {
    if (currentPage < dashboardImages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handlePageChange();
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentPage, dashboardImages]);
  return (
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
          icon: AllIcons.Notification,
          onPress: () => {},
        }}
      />
      <View style={commonStyle.commonContentView}>
        {dashboardImages.length > 0 && (
          <View>
            <PagerView currentPage={currentPage} images={dashboardImages} />
          </View>
        )}

        <View style={{marginTop: 24, paddingBottom: 550}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={FrontDesk(t)}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
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
                    <View style={{justifyContent: 'center', marginLeft: '2%'}}>
                      <Text style={style.listTitle}>{item.title} </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
