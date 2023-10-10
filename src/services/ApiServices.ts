import {
  ADDRESS_DELETE_ENDPOINT,
  ADDRESS_INFO_GET_ENDPOINT,
  ADDRESS_INFO_POST_ENDPOINT,
  BASE_URL,
  CALENDAR_GET_ENDPOINT,
  DAILY_DARSHAN_GET_ENDPOINT,
  DAILY_PROGRAM_GET_ENDPOINT,
  DAILY_QUIZ_ANSWER_POST_ENDPOINT,
  DAILY_QUIZ_GET_ENDPOINT,
  DAILY_QUIZ_HISTORY_GET_ENDPOINT,
  DAILY_QUIZ_STATUS_GET_ENDPOINT,
  DAILY_QUOTES_GET_ENDPOINT,
  DAILY_SATSANG_GET_ENDPOINT,
  DAILY_UPDATES_GET_ENDPOINT,
  DELETE_USER_ENDPOINT,
  EDUCATION_INFO_GET_ENDPOINT,
  EDUCATION_INFO_POST_ENDPOINT,
  EMAIL_POST_ENDPOINT,
  GET_COUNTRIES_ENDPOINT,
  GUEST_LOGIN_GET_ENDPOINT,
  GURUKUL_AUDIO_CATEGORIES_GET_ENDPOINT,
  GURUKUL_AUDIO_GET_ENDPOINT,
  GURUKUL_AUDIO_MULTIPART_GET_ENDPOINT,
  GURUKUL_BRANCH_GET_ENDPOINT,
  GURUKUL_CONNECT_GET_ENDPOINT,
  GURUKUL_CONNECT_POST_ENDPOINT,
  GURUKUL_EVENTS_GET_ENDPOINT,
  LOGIN_POST_ENDPOINT,
  PERSONAL_INFO_GET_ENDPOINT,
  PERSONAL_INFO_POST_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  SAINTFROMFAMILY_GET_ENDPOINT,
  SAINT_NAME_GET_ENDPOINT,
  SLIDER_GET_ENDPOINT,
  VERIFY_POST_ENDPONT,
} from '@env';
import {getBearerToken} from '@services';
import {ApiDateFormat, CustomBackendDateSplitAndFormat} from '@utils';
import axios, {AxiosResponse} from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const handleApiResponse = (response: AxiosResponse<any, any>) => {
  const data = {
    resType: response.data.status === 'success' ? 'SUCCESS' : 'ERROR',
    data: response.data.data,
    message: response.data.message,
    statusCode: response.data.code,
  };
  return data;
};

const apiRequest = async (
  endpoint: string,
  method: string,
  requestData = {},
  headers?: object,
  requireBearerToken = true,
) => {
  try {
    if (requireBearerToken) {
      const bearerToken = getBearerToken();
      if (bearerToken.resType !== 'SUCCESS') {
        throw new Error('Bearer token not available');
      }
    }

    const response = await axiosInstance({
      method,
      url: endpoint,
      headers: headers
        ? {...headers}
        : {
            ...(requireBearerToken && {
              Authorization: `Bearer ${getBearerToken().token}`,
            }),
          },
      ...(method === 'get' || method === 'delete'
        ? {params: requestData}
        : {data: requestData}),
    });
    return handleApiResponse(response);
  } catch (error: any) {
    console.log(error, 'ERROR');
    return {
      resType: 'ERROR',
      data: [],
      message: 'Something went wrong!',
      statusCode: 400,
    };
  }
};

export const LoginApi = async (data: any) => {
  return await apiRequest(LOGIN_POST_ENDPOINT, 'post', data, {}, false);
};

export const RegisterApi = async (
  primary_email: string,
  type?: 'email' | 'forgot',
) => {
  return await apiRequest(
    EMAIL_POST_ENDPOINT,
    'post',
    type === 'forgot'
      ? {email: primary_email, isForgetPassword: true}
      : {email: primary_email},
    {},
    false,
  );
};

export const VerifyOTPApi = async (email: string, otp: string) => {
  return await apiRequest(
    VERIFY_POST_ENDPONT,
    'post',
    {
      email: email,
      otp,
    },
    {},
    false,
  );
};

export const SetPasswordApi = async (password: string) => {
  return await apiRequest(
    RESET_PASSWORD_ENDPOINT,
    'post',
    {
      password: password,
    },
    undefined,
    true,
  );
};

export const GurukulBranchGetApi = async () => {
  return await apiRequest(GURUKUL_BRANCH_GET_ENDPOINT, 'get');
};

export const GetCountriesApi = async () => {
  return await apiRequest(GET_COUNTRIES_ENDPOINT, 'get');
};

export const AddressInfoGetApi = async () => {
  return await apiRequest(ADDRESS_INFO_GET_ENDPOINT, 'get');
};

export const AddressInfoPostApi = async (addressDetails: any) => {
  return await apiRequest(ADDRESS_INFO_POST_ENDPOINT, 'post', {
    address_details: addressDetails,
  });
};

export const DailyQuotesApi = async (date: Date) => {
  const newDate = date.toLocaleString('en-US', ApiDateFormat);
  return await apiRequest(DAILY_QUOTES_GET_ENDPOINT, 'get', {date: newDate});
};

export const DailyDarshanApi = async (date: Date, time: string) => {
  const newDate = date.toLocaleString('en-US', ApiDateFormat);
  return await apiRequest(DAILY_DARSHAN_GET_ENDPOINT, 'get', {
    date: newDate,
    time: time,
  });
};

export const DailyUpdatesApi = async () => {
  return await apiRequest(DAILY_UPDATES_GET_ENDPOINT, 'get');
};

export const DailySatsangApi = async (date: Date) => {
  const newDate = date.toLocaleString('en-US', ApiDateFormat);
  return await apiRequest(DAILY_SATSANG_GET_ENDPOINT, 'get', {
    date: newDate,
  });
};

export const GurkulAudioApi = async () => {
  return await apiRequest(GURUKUL_AUDIO_GET_ENDPOINT, 'get');
};

export const GurukulMultiPartAudio = async (id: number) => {
  return await apiRequest(
    `${GURUKUL_AUDIO_MULTIPART_GET_ENDPOINT}${id}`,
    'get',
  );
};

export const PersonalInfoSaveDetailsApi = async (userPersonalInfo: any) => {
  const payloadData = new FormData();

  let newUserPersonalInfo = JSON.parse(JSON.stringify(userPersonalInfo));

  Object.keys(newUserPersonalInfo).map(key => {
    if (key === 'profile') {
      if (
        newUserPersonalInfo[key].uri === '' ||
        newUserPersonalInfo[key].uri === null ||
        newUserPersonalInfo[key].uri === undefined
      ) {
        delete newUserPersonalInfo[key];
      }
    }
    payloadData.append(`${key}`, newUserPersonalInfo[key]);
  });

  const headers =
    newUserPersonalInfo.profile === '' ||
    newUserPersonalInfo.profile === null ||
    newUserPersonalInfo.profile === undefined
      ? {
          Authorization: `Bearer ${getBearerToken().token}`,
        }
      : {
          Authorization: `Bearer ${getBearerToken().token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        };

  const finalPayload =
    newUserPersonalInfo.profile === '' ||
    newUserPersonalInfo.profile === null ||
    newUserPersonalInfo.profile === undefined
      ? newUserPersonalInfo
      : payloadData;

  const userDataCloneObjFinal = {...finalPayload};

  for (let i in finalPayload) {
    if (
      userDataCloneObjFinal[i] === null ||
      userDataCloneObjFinal[i] === undefined ||
      userDataCloneObjFinal[i] === ''
    ) {
      delete userDataCloneObjFinal[i];
    }
  }

  return await apiRequest(
    PERSONAL_INFO_POST_ENDPOINT,
    'post',
    finalPayload,
    headers,
  );
};

export const PersonalInfoGetDetailsApi = async () => {
  return await apiRequest(PERSONAL_INFO_GET_ENDPOINT, 'get');
};

export const EducationInfoGetApi = async () => {
  return await apiRequest(EDUCATION_INFO_GET_ENDPOINT, 'get');
};

export const EducationInfoPostApi = async (education_details: any) => {
  return await apiRequest(
    EDUCATION_INFO_POST_ENDPOINT,
    'post',
    education_details,
  );
};

export const GurukulConnectGetApi = async () => {
  return await apiRequest(GURUKUL_CONNECT_GET_ENDPOINT, 'get');
};

export const GurukulConnectPostApi = async (gurukulInfo: any) => {
  return await apiRequest(GURUKUL_CONNECT_POST_ENDPOINT, 'post', gurukulInfo);
};

export const SaintNameGetApi = async () => {
  return await apiRequest(SAINT_NAME_GET_ENDPOINT, 'get');
};

export const SaintFromFamilyGetApi = async (type: number) => {
  return await apiRequest(`${SAINTFROMFAMILY_GET_ENDPOINT}=${type}`, 'get');
};

export const AddressDeleteApi = async (id: any) => {
  return await apiRequest(`${ADDRESS_DELETE_ENDPOINT}${id}`, 'delete');
};

export const CalendarGetApi = async (date: Date) => {
  const newDate = date.toLocaleString('en-US', ApiDateFormat);
  return await apiRequest(CALENDAR_GET_ENDPOINT, 'get', {date: newDate});
};
export const SliderGetApi = async () => {
  return await apiRequest(SLIDER_GET_ENDPOINT, 'get');
};

export const DeleteMydataApi = async () => {
  return apiRequest(DELETE_USER_ENDPOINT, 'delete');
};

export const GurkulAudioGetApi = async () => {
  return await apiRequest(GURUKUL_AUDIO_GET_ENDPOINT, 'get');
};

export const GurkulAudioCategoriesGetApi = async () => {
  return await apiRequest(GURUKUL_AUDIO_CATEGORIES_GET_ENDPOINT, 'get');
};

export const GurkulAudioGetFromCategoriesGetApi = async (
  payload: Array<any>,
) => {
  return await apiRequest(GURUKUL_AUDIO_GET_ENDPOINT, 'get', {
    category_ids: [...payload],
  });
};

export const GurkulMultipleAudioGetApi = async (id: number) => {
  return await apiRequest(
    `${GURUKUL_AUDIO_MULTIPART_GET_ENDPOINT}${id}`,
    'get',
  );
};

export const DailyQuizGetApi = async (id: number | undefined) => {
  if (id !== undefined) {
    return apiRequest(`${DAILY_QUIZ_GET_ENDPOINT}${id}`, 'get');
  } else {
    return apiRequest(DAILY_QUIZ_GET_ENDPOINT, 'get');
  }
};
export const DailyQuizAnswerPostApi = async (data: any) => {
  return apiRequest(DAILY_QUIZ_ANSWER_POST_ENDPOINT, 'post', data);
};
export const DailyQuizStatusApi = async () => {
  return apiRequest(DAILY_QUIZ_STATUS_GET_ENDPOINT, 'get');
};
export const DailyQuizHistoryGetApi = async (id: number) => {
  return apiRequest(`${DAILY_QUIZ_HISTORY_GET_ENDPOINT}${id}`, 'get');
};
export const DailyProgramGetApi = async () => {
  return apiRequest(DAILY_PROGRAM_GET_ENDPOINT, 'get');
};
export const GurukulEventGetApi = async () => {
  return apiRequest(GURUKUL_EVENTS_GET_ENDPOINT, 'get');
};
export const GuestLoginGetApi = async () => {
  return apiRequest(
    GUEST_LOGIN_GET_ENDPOINT,
    'get',
    undefined,
    undefined,
    false,
  );
};
// All apis are above, below is helper function for used in auth wizard form:---

export const CallBackButtonAxiosGetForWizardFormSignup = async (
  formStep: number,
  formData: {
    [key: string]: any;
  },
  setFormData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >,
  Toast: any,
) => {
  if (formStep === 1) {
    let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

    const response = await PersonalInfoGetDetailsApi();
    if (response.resType === 'SUCCESS') {
      if (
        response.data !== null &&
        response.data !== undefined &&
        response.data !== ''
      ) {
        if (response.data.personal_details) {
          const profileData = {
            profile: response.data.personal_details.profile
              ? `${BASE_URL}${response.data.personal_details.profile}`
              : newFormData.completeProfile.profile,
            branch_id:
              response.data.personal_details.branch_id ??
              newFormData.completeProfile.branch_id,
          };
          newFormData.completeProfile =
            profileData ?? newFormData.completeProfile;
          setFormData(newFormData);
        }
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

        Object.keys(backendData).map(key => {
          if (key === 'dob') {
            if (backendData[key] !== null) {
              const newDob = CustomBackendDateSplitAndFormat(
                backendData[key],
                '-',
                '/',
                'dd/mm/yyyy',
              );

              newFormData.personalInfo.dob = newDob;
            }
          } else if (key === 'gender') {
            if (backendData[key] !== null) {
              const newgender =
                backendData[key][0] +
                backendData[key].slice(1).toLocaleLowerCase();
              newFormData.personalInfo.gender =
                newgender ?? newFormData.personalInfo.gender;
            }
          } else if (key === 'primary_contact') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].mobilenum =
                backendData[key]?.toString() ??
                newFormData.personalInfo.mobilenumInfo[0].mobilenum;
            }
          } else if (key === 'primary_contact_cc') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].countryCode =
                backendData[key] ??
                newFormData.personalInfo.mobilenumInfo[0].countryCode;
            }
          } else if (key === 'is_primary_contact_wp') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].whatsappNum =
                backendData[key] ??
                newFormData.personalInfo.mobilenumInfo[0].whatsappNum;
            }
          } else if (key === 'secondary_contact') {
            return;
          } else if (key === 'secondary_contact_cc') {
            return;
          } else if (key === 'is_secondary_contact_wp') {
            return;
          } else if (key === 'primary_email') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.emailInfo[0].email =
                backendData[key] ?? newFormData.personalInfo.emailInfo[0].email;
            }
          } else if (key === 'secondary_email') {
            return;
          } else {
            if (backendData[key] !== null) {
              newFormData.personalInfo[key] =
                backendData[key] ?? newFormData.personalInfo[key];
            }
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

export const CallBackButtonAxiosGetForWizardFormEdit = async (
  formStep: number,
  formData: {
    [key: string]: any;
  },
  setFormData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >,
  Toast: any,
) => {
  if (formStep === 1) {
    let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

    const response = await PersonalInfoGetDetailsApi();
    if (response.resType === 'SUCCESS') {
      if (
        response.data.personal_details !== null &&
        response.data.personal_details !== undefined &&
        response.data.personal_details !== ''
      ) {
        const backendData: any = response.data.personal_details;

        const profileData = {
          profile: response.data.personal_details.profile
            ? `${BASE_URL}${response.data.personal_details.profile}`
            : newFormData.completeProfile.profile,
          branch_id:
            response.data.personal_details.branch_id ??
            newFormData.completeProfile.branch_id,
        };
        newFormData.completeProfile =
          profileData ?? newFormData.completeProfile;

        Object.keys(backendData).map(key => {
          if (key === 'dob') {
            if (backendData[key] !== null) {
              const newDob = CustomBackendDateSplitAndFormat(
                backendData[key],
                '-',
                '/',
                'dd/mm/yyyy',
              );
              newFormData.personalInfo.dob = newDob;
            }
          } else if (key === 'gender') {
            if (backendData[key] !== null) {
              const newgender =
                backendData[key][0] +
                backendData[key].slice(1).toLocaleLowerCase();
              newFormData.personalInfo.gender =
                newgender ?? newFormData.personalInfo.gender;
            }
          } else if (key === 'primary_contact') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].mobilenum =
                backendData[key].toString() ??
                newFormData.personalInfo.mobilenumInfo[0].mobilenum;
            }
          } else if (key === 'primary_contact_cc') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].countryCode =
                backendData[key] ??
                newFormData.personalInfo.mobilenumInfo[0].countryCode;
            }
          } else if (key === 'is_primary_contact_wp') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.mobilenumInfo[0].whatsappNum =
                backendData[key] ??
                newFormData.personalInfo.mobilenumInfo[0].whatsappNum;
            }
          } else if (key === 'secondary_contact') {
            return;
          } else if (key === 'secondary_contact_cc') {
            return;
          } else if (key === 'is_secondary_contact_wp') {
            return;
          } else if (key === 'primary_email') {
            if (backendData[key] !== null) {
              newFormData.personalInfo.emailInfo[0].email =
                backendData[key] ?? newFormData.personalInfo.emailInfo[0].email;
            }
          } else if (key === 'secondary_email') {
            return;
          } else {
            if (backendData[key] !== null) {
              newFormData.personalInfo[key] =
                backendData[key] ?? newFormData.personalInfo[key];
            }
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
  if (formStep === 2) {
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
  if (formStep === 3) {
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
  if (formStep === 4) {
    let newFormData: typeof formData = JSON.parse(JSON.stringify(formData));

    const fetchData = await GurukulConnectGetApi();

    const fetchSaintres = await SaintNameGetApi();

    if (
      fetchData.resType === 'SUCCESS' &&
      fetchSaintres.resType === 'SUCCESS'
    ) {
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
        } else {
          newFormData.gurukulInfo.gurukulData[0].RelativeOfSaint = 'No';
        }

        newFormData.gurukulInfo.gurukulData[0].relation =
          fetchData.data.gurukul_connect_details.relation === null ||
          fetchData.data.gurukul_connect_details.relation === undefined ||
          fetchData.data.gurukul_connect_details.relation === ''
            ? ''
            : fetchData.data.gurukul_connect_details.relation;

        newFormData.gurukulInfo.gurukulData[0].FromFamily =
          fetchSaintres.data.saints.find(
            (item: any) =>
              item.id ===
              fetchData.data.gurukul_connect_details.saint_from_family,
          )?.type ?? '';

        newFormData.gurukulInfo.gurukulData[0].saint_from_family =
          fetchSaintres.data.saints.find(
            (item: any) =>
              item.id ===
              fetchData.data.gurukul_connect_details.saint_from_family,
          )?.id ?? '';

        setFormData(newFormData);
      }
    }
  }
};
