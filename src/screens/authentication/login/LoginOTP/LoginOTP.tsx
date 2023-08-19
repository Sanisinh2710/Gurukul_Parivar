import React from 'react';

import {BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AllIcons} from '../../../../../assets/icons';
import {CommonStyle} from '../../../../../assets/styles';
import {
  OtpComponent,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {
  PersonalInfoGetDetailsApi,
  VerifyOTPApi,
  isProfilingDone,
  setAuthToken,
  setUserData,
} from '../../../../services';
import {LoginOtpScreenProps} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';

export const LoginOTP = ({route, navigation}: LoginOtpScreenProps) => {
  const primary_email = route.params?.primary_email;
  const style = styles();
  const CommonStyles = CommonStyle();
  const {t} = useTranslation();
  const [num, setNum] = React.useState<string[]>(['', '', '', '', '', '']);
  const [Otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(120); // Initial countdown time in seconds
  const [resendEnabled, setResendEnabled] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [isApiLoading, setIsApiloading] = React.useState(false);

  const handleLogin = async () => {
    let flag = 0;

    for (let i = 0; i < num.length; i++) {
      if (num[i] === '' || num[i] === undefined) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      return;
    } else {
      setOtp([num.join('')]);
      if (primary_email && num.join('')) {
        setIsApiloading(true);
        const response = await VerifyOTPApi(primary_email, num.join(''));

        if (response.resType === 'SUCCESS') {
          const resType = setAuthToken({
            primary_email: primary_email,
            token: response.data.token,
            is_profile_updated: response.data.is_profile_updated,
          });
          if (resType === 'SUCCESS') {
            const isProfileSignupDone = isProfilingDone(primary_email);
            setIsApiloading(false);

            if (isProfileSignupDone === 'SUCCESS') {
              const backenduserresponse = await PersonalInfoGetDetailsApi();

              if (backenduserresponse.resType === 'SUCCESS') {
                if (
                  backenduserresponse.data.personal_details !== null &&
                  backenduserresponse.data.personal_details !== undefined &&
                  backenduserresponse.data.personal_details !== ''
                ) {
                  let finalData = JSON.parse(
                    JSON.stringify(backenduserresponse.data.personal_details),
                  );

                  finalData.profile = `${BASE_URL}${backenduserresponse.data.personal_details?.profile}`;

                  const setuserdataresponse = setUserData(finalData);

                  if (setuserdataresponse === 'SUCCESS') {
                    navigation.replace('BottomNavBar');
                  }
                }
              } else {
                setIsApiloading(false);
                Toast.show(backenduserresponse.message, 2);
              }
            } else {
              navigation.replace('LoginSuccess', {type: 'Login'});
            }
          } else {
            setIsApiloading(false);
            Toast.show(resType, 2);
          }
        } else {
          setIsApiloading(false);
          Toast.show(response.message, 2);
        }
      }
    }
  };

  React.useEffect(() => {
    let flag = 0;
    for (let i = 0; i < num.length; i++) {
      if (num[i] === '' || num[i] === undefined) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [num]);
  React.useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const handleResendOTP = () => {
    setResendEnabled(false);
    setCountdown(120);
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        showLeft={true}
        leftOnPress={() => {
          navigation.goBack();
        }}
      />
      <View style={CommonStyles.commonContentView}>
        <View style={style.textWrapper}>
          <Text style={style.headerText}>{t('otpScreen.OtpHeader')}</Text>
          <Text style={style.headerSubText}>{t('otpScreen.OtpSubtext')}</Text>
        </View>
        <View style={style.otpContainer}>
          <Text style={style.otpContainerHeader}>
            {t('otpScreen.OtpContainerText')}
          </Text>
          <View style={style.phoneEditContainer}>
            {primary_email && (
              <Text style={style.phoneNumber}>{primary_email}</Text>
            )}
            <View style={style.editIconStyle}>
              <Image source={AllIcons.OTPEdit} style={style.editImageStyle} />
            </View>
          </View>

          <OtpComponent num={num} setNum={setNum} />
          {/* <OtpInput /> */}

          <View style={style.otpNotRecieveContainer}>
            <Text style={style.smallText}>{t('otpScreen.OtpNotRecieve')} </Text>

            {countdown > 0 ? (
              <Text style={style.otpResend}>{formatTime(countdown)}</Text>
            ) : (
              <Pressable onPress={handleResendOTP}>
                <Text style={style.otpResend}>{t('otpScreen.OtpResend')}</Text>
              </Pressable>
            )}
          </View>
          <PrimaryButton
            onPress={handleLogin}
            title={t('otpScreen.Verify&Login')}
            customWidget={
              isApiLoading ? (
                <>
                  <ActivityIndicator
                    size={25}
                    color={COLORS.darkModetextColor}
                  />
                </>
              ) : undefined
            }
            disabled={disabled}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
