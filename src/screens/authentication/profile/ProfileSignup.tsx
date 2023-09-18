import React from 'react';

import {BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {Dimensions, View} from 'react-native';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-simple-toast';
import {CommonStyle} from '../../../../assets/styles';
import {
  AdressInfo,
  CompleteYourProfile,
  EduBusinessInfo,
  GurukulInfo,
  PersonalInfo,
  ScreenHeader,
  ScreenWrapper,
} from '../../../components';
import {
  AddressInfoPostApi,
  CallBackButtonAxiosGetForWizardFormSignup,
  EducationInfoPostApi,
  GurukulConnectPostApi,
  PersonalInfoGetDetailsApi,
  PersonalInfoSaveDetailsApi,
  getAuthToken,
  setUserData,
  setUserProfilingDone,
} from '../../../services';
import {ProfileSignupProps} from '../../../types';
import {COLORS, CustomLocalDateSplitAndFormat, isString} from '../../../utils';

export const ProfileSignup = ({
  navigation,
}: ProfileSignupProps): React.JSX.Element => {
  const commonStyle = CommonStyle();

  const [width, setwidth] = React.useState(20);

  const {t} = useTranslation();

  const [formStep, setFormStep] = React.useState(1);

  const [isParentLoading, setIsParentLoading] = React.useState(false);

  const [formData, setFormData] = React.useState<{[key: string]: any}>({
    completeProfile: {
      profile: '',
      branch_id: null,
    },
    personalInfo: {
      gender: '',
      full_name: '',
      father_name: '',
      dob: '',
      blood_group: '',
      emailInfo: [
        {email: getAuthToken().loginData.primary_email, secondary: false},
      ],
      mobilenumInfo: [
        {
          mobilenum: '',
          secondary: false,
          whatsappNum: false,
          countryCode: '',
        },
      ],
    },
    address_details: [
      {
        country_id: '',
        address: '',
        pincode: '',
        city: '',
        address_type: '',
        is_preferred_communication: true,
      },
    ],
    edu_businessInfo: {
      education: '',
      occupation: '',
      occupation_type: '',
      skills: [],
      other: '',
    },
    gurukulInfo: {
      exGurukulStudent: 'No',
      gurukulData: [
        {
          branch_id: '',
          attend: '',
          standard_from: '',
          standard_to: '',
          ssc_year: '',
          hsc_year: '',
          known_saint: '',
          known_haribhakta: '',
          RelativeOfSaint: 'No',
          FromFamily: '',
          saint_from_family: '',
          relation: '',
        },
      ],
    },
  });

  React.useMemo(async () => {
    await CallBackButtonAxiosGetForWizardFormSignup(
      formStep,
      formData,
      setFormData,
      Toast,
    );
  }, [formStep]);

  const submitButton = async (
    receivedData: any,
    typecase: 'next' | 'skip' | 'exit',
  ) => {
    if (formStep === 1) {
      let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

      newFormData.completeProfile = receivedData;

      setFormData(newFormData);
      setwidth(width + 20);
      setFormStep(formStep + 1);
    }
    if (formStep === 2) {
      let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));
      if (typecase === 'next') {
        setIsParentLoading(true);
        newFormData.personalInfo = receivedData;
        setFormData(newFormData);

        // Convert the submitted data in the backend format :-
        const image = {
          uri: isString(newFormData.completeProfile.profile)
            ? newFormData.completeProfile.profile
            : newFormData.completeProfile.profile?.at(0)?.uri,
          name: isString(newFormData.completeProfile.profile)
            ? `${Date.now().toString()}.jpeg`
            : newFormData.completeProfile.profile?.at(0)?.fileName,
          type: isString(newFormData.completeProfile.profile)
            ? 'image/jpeg'
            : newFormData.completeProfile.profile?.at(0)?.type,
        };

        const toSubmitPersonalInfoData: any = {
          profile: image,
          branch_id: newFormData.completeProfile.branch_id,
          gender: newFormData.personalInfo.gender.toLocaleUpperCase(),
          full_name: newFormData.personalInfo.full_name,
          father_name: newFormData.personalInfo.father_name,
          dob:
            CustomLocalDateSplitAndFormat(
              newFormData.personalInfo.dob,
              '/',
              '/',
              'mm/dd/yyyy',
            ) ?? null,
          blood_group: newFormData.personalInfo.blood_group,
          primary_contact:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.mobilenum ?? null,
          // secondary_contact:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.mobilenum ?? null,

          is_primary_contact_wp:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.whatsappNum ?? null,
          // is_secondary_contact_wp:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.whatsappNum ?? null,

          primary_contact_cc:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === '' ||
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === null ||
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === undefined
              ? '+91(IN)'
              : newFormData.personalInfo.mobilenumInfo.find(
                  (item: any) => item.secondary === false,
                )?.countryCode,
          // secondary_contact_cc:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.countryCode ?? null,

          primary_email:
            newFormData.personalInfo.emailInfo.find(
              (item: any) => item.secondary === false,
            )?.email ?? null,
          // secondary_email:
          //   newFormData.personalInfo.emailInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.email ?? null,
        };

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.mobilenum
        ) {
          toSubmitPersonalInfoData.secondary_contact =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.mobilenum;
        }

        if (
          newFormData.personalInfo.emailInfo.find(
            (item: any) => item.secondary === true,
          )?.email
        ) {
          toSubmitPersonalInfoData.secondary_email =
            newFormData.personalInfo.emailInfo.find(
              (item: any) => item.secondary === true,
            )?.email;
        }

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.countryCode
        ) {
          toSubmitPersonalInfoData.secondary_contact_cc =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.countryCode;
        }

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.whatsappNum
        ) {
          toSubmitPersonalInfoData.is_secondary_contact_wp =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.whatsappNum;
        }

        const response = await PersonalInfoSaveDetailsApi(
          toSubmitPersonalInfoData,
        );

        setIsParentLoading(false);

        const backenduserresponse = await PersonalInfoGetDetailsApi();
        if (
          backenduserresponse.resType === 'SUCCESS' &&
          response.resType === 'SUCCESS'
        ) {
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
              // If want to set userProfilingdone status = true on next button of personal info then uncomment this
              // const setuserprofileDone = setUserProfilingDone(true);
              // if (setuserprofileDone === 'SUCCESS') {
              //   setwidth(width + 20);
              //   setFormStep(formStep + 1);
              // }

              setwidth(width + 20);
              setFormStep(formStep + 1);
            }
          }
        } else {
          Toast.show(response.message, 2);
        }
      }
      if (typecase === 'exit') {
        setIsParentLoading(true);
        newFormData.personalInfo = receivedData;
        setFormData(newFormData);

        // Convert the submitted data in the backend format :-
        const image = {
          uri: isString(newFormData.completeProfile.profile)
            ? newFormData.completeProfile.profile
            : newFormData.completeProfile.profile?.at(0)?.uri,
          name: isString(newFormData.completeProfile.profile)
            ? `${Date.now().toString()}.jpeg`
            : newFormData.completeProfile.profile?.at(0)?.fileName,
          type: isString(newFormData.completeProfile.profile)
            ? 'image/jpeg'
            : newFormData.completeProfile.profile?.at(0)?.type,
        };

        const toSubmitPersonalInfoData: any = {
          profile: image,
          branch_id: newFormData.completeProfile.branch_id,
          gender: newFormData.personalInfo.gender.toLocaleUpperCase(),
          full_name: newFormData.personalInfo.full_name,
          father_name: newFormData.personalInfo.father_name,
          dob:
            CustomLocalDateSplitAndFormat(
              newFormData.personalInfo.dob,
              '/',
              '/',
              'mm/dd/yyyy',
            ) ?? null,
          blood_group: newFormData.personalInfo.blood_group,
          primary_contact:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.mobilenum ?? null,
          // secondary_contact:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.mobilenum ?? null,

          is_primary_contact_wp:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.whatsappNum ?? null,
          // is_secondary_contact_wp:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.whatsappNum ?? null,

          primary_contact_cc:
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === '' ||
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === null ||
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === false,
            )?.countryCode === undefined
              ? '+91(IN)'
              : newFormData.personalInfo.mobilenumInfo.find(
                  (item: any) => item.secondary === false,
                )?.countryCode,
          // secondary_contact_cc:
          //   newFormData.personalInfo.mobilenumInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.countryCode ?? null,

          primary_email:
            newFormData.personalInfo.emailInfo.find(
              (item: any) => item.secondary === false,
            )?.email ?? null,
          // secondary_email:
          //   newFormData.personalInfo.emailInfo.find(
          //     (item: any) => item.secondary === true,
          //   )?.email ?? null,
        };

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.mobilenum
        ) {
          toSubmitPersonalInfoData.secondary_contact =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.mobilenum;
        }

        if (
          newFormData.personalInfo.emailInfo.find(
            (item: any) => item.secondary === true,
          )?.email
        ) {
          toSubmitPersonalInfoData.secondary_email =
            newFormData.personalInfo.emailInfo.find(
              (item: any) => item.secondary === true,
            )?.email;
        }

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.countryCode
        ) {
          toSubmitPersonalInfoData.secondary_contact_cc =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.countryCode;
        }

        if (
          newFormData.personalInfo.mobilenumInfo.find(
            (item: any) => item.secondary === true,
          )?.whatsappNum
        ) {
          toSubmitPersonalInfoData.is_secondary_contact_wp =
            newFormData.personalInfo.mobilenumInfo.find(
              (item: any) => item.secondary === true,
            )?.whatsappNum;
        }

        const response = await PersonalInfoSaveDetailsApi(
          toSubmitPersonalInfoData,
        );
        setIsParentLoading(false);

        const backenduserresponse = await PersonalInfoGetDetailsApi();
        if (
          backenduserresponse.resType === 'SUCCESS' &&
          response.resType === 'SUCCESS'
        ) {
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
              const setuserprofileDone = setUserProfilingDone(true);
              if (setuserprofileDone === 'SUCCESS') {
                navigation.navigate('Success', {type: 'Profile'});
              }
            }
          }
        } else {
          Toast.show(response.message, 2);
        }
      }
    }
    if (formStep === 3) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.address_details = receivedData;
          setFormData(newFormData);
          const response = await AddressInfoPostApi(
            newFormData.address_details,
          );

          if (response.resType === 'SUCCESS') {
            setwidth(width + 20);
            setFormStep(formStep + 1);
          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        }
      }
      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.address_details = receivedData;
          setFormData(newFormData);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
    }
    if (formStep === 4) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.edu_businessInfo = receivedData;
          setFormData(newFormData);
          const response = await EducationInfoPostApi(
            newFormData.edu_businessInfo,
          );
          if (response.resType === 'SUCCESS') {
            setwidth(width + 20);
            setFormStep(formStep + 1);
          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }

      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.edu_businessInfo = receivedData;
          setFormData(newFormData);
        }
        setwidth(width + 20);
        setFormStep(formStep + 1);
      }
    }
    if (formStep === 5) {
      if (typecase === 'next') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        if (receivedData !== undefined) {
          newFormData.gurukulInfo = receivedData;

          setFormData(newFormData);

          const response = await GurukulConnectPostApi(
            newFormData.gurukulInfo.gurukulData[0],
          );

          const setuserprofileDone = setUserProfilingDone(true);
          if (
            setuserprofileDone === 'SUCCESS' &&
            response.resType === 'SUCCESS'
          ) {
            navigation.navigate('Success', {type: 'Profile'});
          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        }
      }
      if (typecase === 'skip') {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));
        if (receivedData !== undefined) {
          newFormData.gurukulInfo = receivedData;

          setFormData(newFormData);
          const setuserprofileDone = setUserProfilingDone(true);
          if (setuserprofileDone === 'SUCCESS') {
            navigation.navigate('Success', {type: 'Profile'});
          }
        }
      }
    }
  };

  const headerTitle = React.useMemo(() => {
    return formStep === 1
      ? t('uploadPhoto.HederText')
      : formStep === 2
      ? t('personalInfo.personalInfoHeader')
      : formStep === 3
      ? t('addressInfo.AddressHeader')
      : formStep === 4
      ? t('education/BusinessInfo.EduHeader')
      : formStep === 5
      ? t('gurukulInfo.GurukulHeader')
      : '';
  }, [formStep, t]);

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
        headerTitle={headerTitle}
        headerTitleAlign="left"
        leftOnPress={() => {
          if (width > 20) {
            setwidth(width - 20);
            setFormStep(formStep - 1);
          }
        }}
      />

      <View style={[commonStyle.commonContentView]}>
        {formStep === 1 ? (
          <CompleteYourProfile
            isParentLoading={isParentLoading}
            initialValues={formData.completeProfile}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 2 ? (
          <PersonalInfo
            isParentLoading={isParentLoading}
            initialValues={{
              gender: formData.personalInfo.gender,
              full_name: formData.personalInfo.full_name,
              father_name: formData.personalInfo.father_name,
              dob: formData.personalInfo.dob,
              blood_group: formData.personalInfo.blood_group,
              mobilenumInfo: [...formData.personalInfo.mobilenumInfo].map(
                item => {
                  let newItem: any = {};

                  newItem.mobilenum = item.mobilenum ?? '';
                  newItem.countryCode = item.countryCode;
                  newItem.secondary = item.secondary;
                  newItem.whatsappNum = item.whatsappNum;

                  return newItem;
                },
              ),
              emailInfo: formData.personalInfo.emailInfo,
            }}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 3 ? (
          <AdressInfo
            initialValues={{address_details: [...formData.address_details]}}
            formData={formData}
            setFormData={setFormData}
            onSubmitEvent={submitButton}
          />
        ) : formStep === 4 ? (
          <EduBusinessInfo
            initialValues={formData.edu_businessInfo}
            onSubmitEvent={submitButton}
          />
        ) : (
          formStep === 5 && (
            <GurukulInfo
              initialValues={formData.gurukulInfo}
              onSubmitEvent={submitButton}
            />
          )
        )}
      </View>
    </ScreenWrapper>
  );
};
