import React from 'react';

import {AllIcons, AllImages, CommonStyle} from '@assets';
import {
  DropDownModel,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '@components';
import {COLORS, FrontDesk} from '@utils';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {useAppSelector} from '@redux/hooks';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootBottomTabParamList, RootStackParamList} from '@types';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {removeAuthToken} from '@services';

export const FrontDeskScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'FrontDesk'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  /*  */
  const style = styles();
  const {userRole} = useAppSelector(state => state.currUser);

  const {t} = useTranslation();
  const commonStyle = CommonStyle();
  const [loginModel, setloginModel] = React.useState<boolean>(false);

  const handlePress = (val: string) => {
    switch (val) {
      case 'Ravisabha':
        if (userRole === 'GUEST') {
          setloginModel(true);
        } else {
          navigation.navigate('RaviSabha');
        }
        break;
      case 'connect':
        navigation.navigate('GurukulConnect');
        break;
      case 'quiz':
        navigation.navigate('dailyQuizDetail');
        break;
      // case 'donation':
      //   navigation.navigate('donation');
      //   break;
      case 'event':
        navigation.navigate('GurukulEvents');
        break;
      default:
        break;
    }
  };

  const loginModelJSX = (
    <View
      style={style.loginModelView}
      onTouchEnd={e => {
        e.stopPropagation();
      }}>
      <View style={style.loginModelLogo}>
        <Image
          source={AllImages.AppLogo}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View style={{gap: 5}}>
        <Text
          style={[
            style.loginText,
            {
              color: COLORS.black,
              fontSize: 20,
            },
          ]}>
          {t('common.AppName')}
        </Text>
        <Text style={style.loginText}>{t('common.feedbackMsg')}</Text>
      </View>
      <View style={style.submitButtonView}>
        <PrimaryButton
          title={t('common.No')}
          buttonStyle={style.submitButtonStyle}
          onPress={() => {
            setloginModel(false);
          }}
        />
        <PrimaryButton
          title={t('common.Signin')}
          buttonStyle={style.submitButtonStyle}
          onPress={() => {
            const resRemoveAuthToken = removeAuthToken();

            if (resRemoveAuthToken === 'SUCCESS') {
              navigation.replace('Auth');
            }
          }}
          buttonColor="#2f9635"
        />
      </View>
    </View>
  );

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
      />
      <ScrollView
        overScrollMode="always"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '30%',
        }}>
        <View style={[{flex: 1}]}>
          <View style={style.boxView}>
            {FrontDesk(t).map((item, index) => (
              <View key={index} style={style.boxViewInnerView}>
                <View
                  onTouchEnd={() => handlePress(item.id)}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}>
                  <View style={[style.imageContainer]}>
                    <Image
                      source={item.image}
                      style={{height: 34, width: 34}}
                    />
                  </View>
                  <Text numberOfLines={2} style={style.listTitle}>
                    {item.title}{' '}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <DropDownModel
          viewPhoto={true}
          modelVisible={loginModel}
          setModelVisible={setloginModel}
          customModelchild={loginModelJSX}
          type={'simple'}
          modalHeight={'40%'}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};
