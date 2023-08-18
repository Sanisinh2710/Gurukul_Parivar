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

export const FrontDeskScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [dashboardImages, setDashboardImages] = React.useState([
    AllImages.Rectangle,
    AllImages.Rectangle3,
    AllImages.Rectangle2,
  ]);
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

      default:
        break;
    }
  };
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
        <View
          onTouchStart={e => {
            TouchX.current = e.nativeEvent.pageX;
          }}
          onTouchEnd={e => {
            if (TouchX.current - e.nativeEvent.pageX > 20) {
              if (currentPage < dashboardImages.length - 1) {
                setCurrentPage(currentPage + 1);
              }
            }
            if (TouchX.current - e.nativeEvent.pageX < -20) {
              if (
                currentPage > 0 &&
                currentPage <= dashboardImages.length - 1
              ) {
                setCurrentPage(currentPage - 1);
              }
            }
          }}>
          <PagerView currentPage={currentPage} images={dashboardImages} />
        </View>

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
