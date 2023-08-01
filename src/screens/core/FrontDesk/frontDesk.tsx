import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyle} from '../../../../assets/styles';
import {ScreenHeader} from '../../../components';
import {PagerView} from '../../../components/ui/Carousel/pagerView';
import {CustomFonts, FrontDesk} from '../../../utils';
import {styles} from './styles';
import {useAppSelector} from '../../../redux/hooks';
import {AllIcons} from '../../../../assets/icons';

export const FrontDeskScreen = () => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const style = styles();
  const TouchX = React.useRef<any>();

  const {t} = useTranslation();
  const commonStyle = CommonStyle();
  return (
    <SafeAreaView style={commonStyle.commonContainer}>
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
          onPress: () => {
            console.log('Notification recieved');
          },
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
      </View>
      <View style={{marginTop: 24}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={FrontDesk(t)}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: '5%',
                  marginVertical: '4%',
                }}>
                <View
                  style={{
                    height: 48,
                    width: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <Image source={item.image} style={{height: 24, width: 24}} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: '5%',
                  }}>
                  <Text
                    style={{
                      ...CustomFonts.header.medium20,
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {item.title}{' '}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
