import React from 'react';

import * as Progress from 'react-native-progress';

import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';
import {CommonStyle} from '../../../../assets/styles';
import {
  CompleteYourProfile,
  PersonalInfo,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {COLORS} from '../../../utils';

export const ProfileSignup = (): React.JSX.Element => {
  const commonStyle = CommonStyle();

  const [width, setwidth] = React.useState(20);

  const {t, i18n} = useTranslation();

  const [formStep, setFormStep] = React.useState(1);

  const [formData, setFormData] = React.useState({
    completeProfile: {
      profilePic: '',
      gurukulName: '',
    },
    personalInfo: {
      gender: '',
      fullname: '',
      fatherFullName: '',
      dob: '',
      bloodGroup: '',
      mobilenum: '',
      secondaryMobileNum: '',
      email: '',
      secondaryEmail: '',
    },
  });

  const submitButton = (receivedData: any) => {
    if (formStep === 1) {
      let newFormData = JSON.parse(JSON.stringify(formData));

      newFormData.completeProfile = receivedData;

      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    } else {
      console.log('Form step 2');
    }
  };

  console.log(formData);

  const [calendarVisible, setCalendarVisible] = React.useState(true);

  return (
    <ScreenWrapper>
      <Progress.Bar
        progress={width / 100}
        width={Dimensions.get('window').width}
        borderRadius={0}
        color={COLORS.primaryColor}
        unfilledColor={COLORS.unfilledProgressbar}
        borderWidth={0}
      />

      <ScreenHeader
        showLeft={true}
        headerTitle={t('uploadPhoto.HederText')}
        headerTitleAlign="center"
        leftOnPress={() => {
          if (width > 20) {
            setwidth(width - 20);
            setFormStep(formStep - 1);
          }
        }}
      />
      <View style={commonStyle.commonContentView}>
        {formStep === 1 ? (
          <CompleteYourProfile
            initialValues={formData.completeProfile}
            onSubmitEvent={submitButton}
          />
        ) : (
          formStep === 2 && (
            <PersonalInfo
              initialValues={formData.personalInfo}
              onSubmitEvent={submitButton}
            />
          )
        )}
      </View>
    </ScreenWrapper>
  );
};
