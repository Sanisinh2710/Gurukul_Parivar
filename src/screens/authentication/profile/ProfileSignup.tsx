import React from 'react';

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
  AddressInfoGetApi,
  AddressInfoPostApi,
  EducationInfoGetApi,
  EducationInfoPostApi,
  GurukulConnectGetApi,
  GurukulConnectPostApi,
  PersonalInfoGetDetailsApi,
  PersonalInfoSaveDetailsApi,
  getAuthToken,
  setUserProfilingDone,
} from '../../../services';
import {ProfileSignupProps} from '../../../types';
import {
  COLORS,
  CustomBackendDateSplitAndFormat,
  CustomLocalDateSplitAndFormat,
} from '../../../utils';

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
      mobilenumInfo: [
        {
          mobilenum: getAuthToken().loginData.mobileNum,
          secondary: false,
          whatsappNum: false,
          countryCode: getAuthToken().loginData.countryCode,
        },
      ],
      emailInfo: [{email: '', secondary: false}],
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
    const CallBackButtonAxiosGet = async () => {
      if (formStep === 1) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const response = await PersonalInfoGetDetailsApi();
        if (response.resType === 'SUCCESS') {
          if (
            response.data !== null &&
            response.data !== undefined &&
            response.data !== ''
          ) {
            newFormData.completeProfile =
              response.data.completeProfile ?? newFormData.completeProfile;
            setFormData(newFormData);
          }
        }
      }
      if (formStep === 2) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const response = await PersonalInfoGetDetailsApi();
        if (response.resType === 'SUCCESS') {
          if (
            response.data.personal_details !== null &&
            response.data.personal_details !== undefined &&
            response.data.personal_details !== ''
          ) {
            const backendData: any = response.data.personal_details;

            Object.keys(backendData).map((key, index) => {
              if (key === 'dob') {
                const newDob = CustomBackendDateSplitAndFormat(
                  backendData[key],
                  '-',
                  '/',
                  'dd/mm/yyyy',
                );

                newFormData.personalInfo.dob = newDob;
              } else if (key === 'gender') {
                const newgender =
                  backendData[key][0] +
                  backendData[key].slice(1).toLocaleLowerCase();
                newFormData.personalInfo.gender =
                  newgender ?? newFormData.personalInfo.gender;
              } else if (key === 'primary_contact') {
                newFormData.personalInfo.mobilenumInfo[0].mobilenum =
                  backendData[key].toString() ??
                  newFormData.personalInfo.mobilenumInfo[0].mobilenum;
              } else if (key === 'primary_contact_cc') {
                newFormData.personalInfo.mobilenumInfo[0].countryCode =
                  backendData[key] ??
                  newFormData.personalInfo.mobilenumInfo[0].countryCode;
              } else if (key === 'is_primary_contact_wp') {
                newFormData.personalInfo.mobilenumInfo[0].whatsappNum =
                  backendData[key] ??
                  newFormData.personalInfo.mobilenumInfo[0].whatsappNum;
              } else if (key === 'secondary_contact') {
                return;
              } else if (key === 'secondary_contact_cc') {
                return;
              } else if (key === 'is_secondary_contact_wp') {
                return;
              } else if (key === 'primary_email') {
                newFormData.personalInfo.emailInfo[0].email =
                  backendData[key] ??
                  newFormData.personalInfo.emailInfo[0].email;
              } else if (key === 'secondary_email') {
                return;
              } else {
                newFormData.personalInfo[key] =
                  backendData[key] ?? newFormData.personalInfo[key];
              }
            });

            if (newFormData.personalInfo.mobilenumInfo.length <= 1) {
              if (
                backendData['secondary_contact'] &&
                backendData['secondary_contact_cc'] &&
                backendData['is_secondary_contact_wp']
              ) {
                const newJSON: any = {};
                newJSON.mobilenum = backendData['secondary_contact'];
                newJSON.countryCode = backendData['secondary_contact_cc'];
                newJSON.whatsappNum = backendData['is_secondary_contact_wp'];
                newJSON.secondary = true;

                newFormData.personalInfo.mobilenumInfo.push(newJSON);
              }
            } else {
              if (newFormData.personalInfo.mobilenumInfo[1].mobilenum) {
                newFormData.personalInfo.mobilenumInfo[1].secondary = true;
              }
            }

            if (newFormData.personalInfo.emailInfo.length <= 1) {
              if (backendData['secondary_email']) {
                const newJSON: any = {};
                newJSON.email = backendData['secondary_email'];
                newJSON.secondary = true;

                newFormData.personalInfo.emailInfo.push(newJSON);
              }
            } else {
              if (newFormData.personalInfo.emailInfo[1].email) {
                newFormData.personalInfo.emailInfo[1].secondary = true;
              }
            }

            setFormData(newFormData);
          }
        }
      }
      if (formStep === 3) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const fetchData = await AddressInfoGetApi();
        if (fetchData.resType === 'SUCCESS') {
          if (
            fetchData.data.address_details !== null &&
            fetchData.data.address_details !== undefined &&
            fetchData.data.address_details !== ''
          ) {
            newFormData.address_details =
              fetchData.data.address_details.length >= 1
                ? fetchData.data.address_details
                : newFormData.address_details;
            setFormData(newFormData);
          }
        } else {
          Toast.show(fetchData.message, Toast.SHORT);
        }
      }
      if (formStep === 4) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const fetchData = await EducationInfoGetApi();

        if (fetchData.resType === 'SUCCESS') {
          if (
            fetchData.data.education_details !== undefined &&
            fetchData.data.education_details !== null &&
            fetchData.data.education_details !== ''
          ) {
            newFormData.edu_businessInfo = fetchData.data.education_details;
            setFormData(newFormData);
          }
        }
      }
      if (formStep === 5) {
        let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

        const fetchData = await GurukulConnectGetApi();

        if (fetchData.resType === 'SUCCESS') {
          if (
            fetchData.data.gurukul_connect_details !== undefined &&
            fetchData.data.gurukul_connect_details !== null &&
            fetchData.data.gurukul_connect_details !== ''
          ) {
            newFormData.gurukulInfo.exGurukulStudent = 'Yes';

            newFormData.gurukulInfo.gurukulData[0] =
              fetchData.data.gurukul_connect_details;

            if (fetchData.data.gurukul_connect_details.saint_from_family) {
              newFormData.gurukulInfo.gurukulData[0].RelativeOfSaint = 'Yes';
            }

            setFormData(newFormData);
          }
        }
      }
    };

    await CallBackButtonAxiosGet();
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
          uri: newFormData.completeProfile.profile?.at(0)?.uri,
          name: newFormData.completeProfile.profile?.at(0)?.fileName,
          type: newFormData.completeProfile.profile?.at(0)?.type,
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

        if (response.resType === 'SUCCESS') {
          setwidth(width + 20);
          setFormStep(formStep + 1);
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
          uri: newFormData.completeProfile.profile?.at(0)?.uri,
          name: newFormData.completeProfile.profile?.at(0)?.fileName,
          type: newFormData.completeProfile.profile?.at(0)?.type,
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

        if (response.resType === 'SUCCESS') {
          const setuserprofileDone = setUserProfilingDone(true);
          if (setuserprofileDone === 'SUCCESS') {
            navigation.navigate('LoginSuccess', {type: 'Profile'});
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
          console.log(newFormData.gurukulInfo.gurukulData[0]);

          setFormData(newFormData);

          const response = await GurukulConnectPostApi(
            newFormData.gurukulInfo.gurukulData[0],
          );

          const setuserprofileDone = setUserProfilingDone(true);
          if (
            setuserprofileDone === 'SUCCESS' &&
            response.resType === 'SUCCESS'
          ) {
            navigation.navigate('LoginSuccess', {type: 'Profile'});
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
            navigation.navigate('LoginSuccess', {type: 'Profile'});
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

                  newItem.mobilenum = item.mobilenum || '';
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
