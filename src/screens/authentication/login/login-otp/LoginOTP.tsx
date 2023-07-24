import React from 'react';
import {Text, View} from 'react-native';
import {ScreenHeader} from '../../../../components';
import {styles} from '../login-otp/styles';
import {CommonStyle} from '../../../../../assets/styles/common.style';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../../utils/colors';
import OTPTextView from 'react-native-otp-textinput';
import CustomButton from '../../../../components/ui/Buttons/Button';

export const LoginOTP = () => {
  const style = styles();
  const CommonStyles = CommonStyle();
  return (
    <View style={CommonStyles.container}>
      <ScreenHeader theme={undefined} showLeft={true} />
      <View style={style.container}>
        <View style={style.textWrapper}>
          <Text style={style.headerText}>OTP Verification</Text>
          <Text style={style.headerSubText}>
            Please verify your mobile number to proceed
          </Text>
        </View>
        <View>
          <View style={style.otpContainer}>
            <Text style={style.otpContainerHeader}>
              An OTP has been sent to mobile number
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                gap: 10,
              }}>
              <Text style={style.phoneNumber}>+91-9876543210</Text>
              <View style={style.editIconStyle}>
                <Icon name="edit-3" size={14} />
              </View>
            </View>
            <OTPTextView
              textInputStyle={{
                borderWidth: 1,
                borderRadius: 12,
                borderBottomWidth: 1,
                backgroundColor: 'rgba(172, 43, 49, 0.1)',
              }}
              inputCount={6}
              keyboardType="phone-pad"
              tintColor={COLORS.primaryColor}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                marginBottom: 57,
                justifyContent: 'center',
              }}>
              <Text style={style.smallText}>Didn’t receive code? </Text>
              <Text style={style.otpResend}>Resend</Text>
            </View>
            <CustomButton
              onPress={() => {
                console.log('Pressed');
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
