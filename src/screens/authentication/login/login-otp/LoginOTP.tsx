import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScreenHeader} from '../../../../components';
import {styles} from '../login-otp/styles';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../../utils/colors';
import CustomButton from '../../../../components/ui/Buttons/Button';
import {OtpComponent} from '../../../../components/features/otpComponent';
import {useTranslation} from 'react-i18next';
import {LoginOtpScreenProps} from '../../../../types';

export const LoginOTP = ({navigation}: LoginOtpScreenProps) => {
  const style = styles();
  const CommonStyles = CommonStyle();
  const {t, i18n} = useTranslation();
  const [num, setNum] = React.useState<string[]>(['', '', '', '', '', '']);
  const [Otp, setOtp] = React.useState<string[]>([]);

  return (
    <View style={CommonStyles.container}>
      <ScreenHeader theme={undefined} showLeft={true} />
      <View style={style.container}>
        <View style={style.textWrapper}>
          <Text style={style.headerText}>{t('otpScreen:OtpHeader')}</Text>
          <Text style={style.headerSubText}>{t('otpScreen:OtpSubtext')}</Text>
        </View>
        <View>
          <View style={style.otpContainer}>
            <Text style={style.otpContainerHeader}>
              {t('otpScreen:OtpContainerText')}
            </Text>
            <View style={style.phoneEditContainer}>
              <Text style={style.phoneNumber}>+91-9876543210</Text>
              <View style={style.editIconStyle}>
                <Icon name="edit-3" size={14} />
              </View>
            </View>

            <OtpComponent num={num} setNum={setNum} />
            <View style={style.otpNotRecieveContainer}>
              <Text style={style.smallText}>
                {t('otpScreen:OtpNotRecieve')}{' '}
              </Text>
              <Text style={style.otpResend}>{t('otpScreen:OtpResend')}</Text>
            </View>
            <CustomButton
              onPress={() => {
                setOtp([num.join('')]);
                navigation.replace('LoginSuccess');
              }}
              textStyle={style.buttonText}
              titleColor={COLORS.white}
              buttonColor={COLORS.primaryColor}
              title="Verify & Login"
              buttonStyle={style.buttonStyle}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
