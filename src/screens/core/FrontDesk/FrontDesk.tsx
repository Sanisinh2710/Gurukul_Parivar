import React from 'react';

import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {PagerView, ScreenHeader, ScreenWrapper} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {CustomFonts, FrontDesk} from '../../../utils';
import {styles} from './styles';
import {AllIcons} from '../../../../assets/icons';

export const FrontDeskScreen = () => {
  const theme = useAppSelector(state => state.theme.theme);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const style = styles();
  const TouchX = React.useRef<any>();

  const {t} = useTranslation();
  const commonStyle = CommonStyle();
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
        <View style={{marginTop: 24}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={FrontDesk(t)}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '2.5%',
                    marginHorizontal: '2%',
                    borderRadius: 12,
                    height: 64,
                    backgroundColor: '#ffffff',
                  }}>
                  <View
                    style={{
                      height: 48,
                      width: 48,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      backgroundColor: item.imageBG,
                      marginHorizontal: 8,
                    }}>
                    <Image
                      source={item.image}
                      style={{height: 24, width: 24}}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: '2%',
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
      </View>
    </ScreenWrapper>
  );
};
