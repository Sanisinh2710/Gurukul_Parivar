import React from 'react';

import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts, FrontDesk} from '../../../utils';
import {styles} from './styles';
import {AllIcons} from '../../../../assets/icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';

export const FrontDeskScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
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
          onTouchStart={e => (TouchX.current = e.nativeEvent.pageX)}
          onTouchEnd={e => {
            if (TouchX.current - e.nativeEvent.pageX > 20) {
              if (currentPage < 3) {
                setCurrentPage(currentPage + 1);
              }
            }
            if (TouchX.current - e.nativeEvent.pageX < -20) {
              if (currentPage > 1 && currentPage <= 3) {
                setCurrentPage(currentPage - 1);
              }
            }
          }}>
          <PagerView currentPage={currentPage} />
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
