import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {CommonStyle} from '../../../../assets/styles';
import {PrimaryButton, RoundedIcon, ScreenHeader} from '../../../components';
import {useAppSelector} from '../../../redux/hooks';
import {COLORS, CustomFonts, EditProfile} from '../../../utils';
import {styles} from './styles';

export const ProfileScreen = React.memo(() => {
  const theme = useAppSelector(state => state.theme.theme);

  const style = styles();
  const commonStyle = CommonStyle();

  return (
    <SafeAreaView style={commonStyle.commonContainer}>
      <ScreenHeader
        showLeft={false}
        headerTitleAlign={'left'}
        customTitle={
          <View>
            <Text style={style.title}>My Profile</Text>
          </View>
        }
        headerRight={{
          icon: AllIcons.Notification,
          onPress: () => {
            console.log('Notification recieved');
          },
        }}
      />
      <ScrollView
        contentContainerStyle={[
          commonStyle.commonContentView,
          {paddingBottom: '25%'},
        ]}
        showsVerticalScrollIndicator={false}>
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
          <Image
            source={require('../../../../assets/images/Person.png')}
            style={{height: 64, width: 64}}
          />
          <View style={{justifyContent: 'center', marginLeft: '5%'}}>
            <Text
              style={{
                ...CustomFonts.header.medium20,
                fontSize: 16,
                color: 'black',
              }}>
              Maheshbhai Desai
            </Text>
            <Text>+91-9873957274</Text>
            <View
              style={{
                height: 28,
                width: 116,
                backgroundColor: 'rgba(172, 43, 49, 0.1)',
                // padding: 1,
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: COLORS.primaryColor,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                Family ID: 148410
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
            borderWidth: 0.25,
            borderColor: 'rgba(172, 43, 49,0.3)',
            borderRadius: 8,
          }}>
          {EditProfile.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: item.name === 'Logout' ? 0 : 1,
                  borderColor: 'rgba(23, 23, 23,0.1)',
                  flexDirection: 'row',
                  marginHorizontal: '7%',
                  marginVertical: '4%',
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
            );
          })}
        </View>
        <View>
          <PrimaryButton
            title="Delete Account"
            onPress={() => console.log('hi')}
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
    </SafeAreaView>
  );
});
