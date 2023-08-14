import React from 'react';

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
  VerifyOTPApi,
  isProfilingDone,
  setAuthToken,
} from '../../../../services';
import {LoginOtpScreenProps} from '../../../../types';
import {COLORS} from '../../../../utils';
import {styles} from './styles';

export const LoginOTP = ({route, navigation}: LoginOtpScreenProps) => {
  const mobileNum = route.params?.mobileNum;
  const countryCode = route.params?.countryCode;
  const style = styles();
  const CommonStyles = CommonStyle();
  const {t} = useTranslation();
  const [num, setNum] = React.useState<string[]>(['', '', '', '', '', '']);
  const [Otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(120); // Initial countdown time in seconds
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
      if (mobileNum && num.join('')) {
        setIsApiloading(true);
        const response = await VerifyOTPApi(mobileNum, num.join(''));

        if (response.resType === 'SUCCESS') {
          const resType = setAuthToken({
            mobileNum: mobileNum,
            countryCode: countryCode,
            token: response.data.token,
          });
          if (resType === 'SUCCESS') {
            const isProfileSignupDone = isProfilingDone(mobileNum);
            setIsApiloading(false);

            if (isProfileSignupDone === 'SUCCESS') {
              navigation.replace('BottomNavBar');
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
    for (let i = 0; i < num.length; i++) {
      if (num[i] !== '' || num[i] === undefined) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
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
            {countryCode && mobileNum && (
              <Text style={style.phoneNumber}>
                {countryCode.split('(')[0].toString() + mobileNum}
              </Text>
            )}
            <View style={style.editIconStyle}>
              <Image source={AllIcons.OTPEdit} style={style.editImageStyle} />
            </View>
          </View>

          <OtpComponent num={num} setNum={setNum} />

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
