import React from 'react';

import {useTranslation} from 'react-i18next';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CommonStyle} from '../../../../../assets/styles';
import {
  OtpComponent,
  PrimaryButton,
  ScreenHeader,
  ScreenWrapper,
} from '../../../../components';
import {LoginOtpScreenProps} from '../../../../types';
import {styles} from './styles';

export const LoginOTP = ({navigation}: LoginOtpScreenProps) => {
  const style = styles();
  const CommonStyles = CommonStyle();
  const {t, i18n} = useTranslation();
  const [num, setNum] = React.useState<string[]>(['', '', '', '', '', '']);
  const [Otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(120); // Initial countdown time in seconds
  const [resendEnabled, setResendEnabled] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);

  const handleLogin = () => {
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
      navigation.replace('LoginSuccess', {type: 'Login'});
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
            <Text style={style.phoneNumber}>+91-9876543210</Text>
            <View style={style.editIconStyle}>
              <Icon name="edit-3" size={14} />
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
            disabled={disabled}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
