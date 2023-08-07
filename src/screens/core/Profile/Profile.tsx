import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {
  PrimaryButton,
  RoundedIcon,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS, CustomFonts, EditProfile} from '../../../utils';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {AllIcons} from '../../../../assets/icons';
import {AllImages} from '../../../../assets/images';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootBottomTabParamList, RootStackParamList} from '../../../types';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export const ProfileScreen = ({
  navigation,
}: CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>) => {
  const theme = useAppSelector(state => state.theme.theme);
  const {t, i18n} = useTranslation();
  const style = styles();
  const commonStyle = CommonStyle();

  React.useEffect(() => {
    const language = i18n.language;
  }, []);
  const handlePress = (val: string) => {
    switch (val) {
      case 'user':
        navigation.navigate('editProfile');
        break;
      case 'family':
        navigation.navigate('dailyQuotes');
        break;
      case 'translation':
        navigation.navigate('changeLanguage');
        break;
      case 'help':
        navigation.navigate('calendar');
        break;
      case 'feedback':
        navigation.navigate('liveSatsang');
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
            <Text style={style.title}>{t('myProfile.Heading')}</Text>
          </View>
        }
        headerRight={{
          icon: AllIcons.Notification,
          onPress: () => {},
        }}
      />
      <ScrollView
        contentContainerStyle={[
          commonStyle.commonContentView,
          {paddingBottom: '25%'},
        ]}
        showsVerticalScrollIndicator={true}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.25,
            borderColor: 'rgba(172, 43, 49,0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            marginTop: 10,
            padding: 20,
            borderRadius: 8,
          }}>
          <Image source={AllImages.Person} style={{height: 64, width: 64}} />
          <View style={{justifyContent: 'center', marginLeft: '5%'}}>
            <Text
              style={{
                ...CustomFonts.header.medium20,
                fontSize: 16,
                color: 'black',
              }}>
              {t('myProfile.Name')}
            </Text>
            <Text>+91-9873957274</Text>
            <View
              style={{
                height: 28,
                width: 116,
                backgroundColor: 'rgba(172, 43, 49, 0.1)',
                marginTop: '5%',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: COLORS.primaryColor,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                {t('myProfile.ID')}:148410
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            borderWidth: 0.25,
            borderColor: 'rgba(172, 43, 49,0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 8,
          }}>
          {EditProfile(t).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(item.id);
                }}>
                <View
                  style={{
                    borderBottomWidth: item.name === 'Logout' ? 0 : 1,
                    borderColor: 'rgba(23, 23, 23,0.1)',
                    flexDirection: 'row',
                    marginHorizontal: '5%',
                    marginVertical: '3.5%',
                    paddingBottom: '2.5%',
                  }}>
                  <RoundedIcon
                    icon={item.image}
                    onPress={() => {}}
                    imageStyle={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: '5%',
                    }}>
                    <Text
                      style={{
                        ...CustomFonts.body.medium12,
                        fontSize: 16,
                        color: 'black',
                      }}>
                      {item.name}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={{color: COLORS.primaryColor, fontSize: 14}}>
                      {item.language}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    {item.rightIcon && (
                      <Image
                        source={item.rightIcon}
                        style={{height: 24, width: 24}}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <PrimaryButton
            title="Delete Account"
            onPress={() => {}}
            buttonColor={'rgba(172, 43, 49, 0.1)'}
            titleColor={COLORS.primaryColor}
            buttonStyle={{
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginVertical: '5%',
              borderRadius: 10,
            }}
            textStyle={{fontSize: 16}}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};
