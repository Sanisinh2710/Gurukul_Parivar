import axios, {AxiosResponse} from 'axios';
import {
  ADDRESS_DELETE_ENDPOINT,
  ADDRESS_INFO_GET_ENDPOINT,
  ADDRESS_INFO_POST_ENDPOINT,
  BASE_URL,
  DAILY_DARSHAN_GET_ENDPOINT,
  DAILY_QUOTES_GET_ENDPOINT,
  DAILY_SATSANG_GET_ENDPOINT,
  DAILY_UPDATES_GET_ENDPOINT,
  EDUCATION_INFO_GET_ENDPOINT,
  EDUCATION_INFO_POST_ENDPOINT,
  GET_COUNTRIES_ENDPOINT,
  GURUKUL_BRANCH_GET_ENDPOINT,
  GURUKUL_CONNECT_GET_ENDPOINT,
  GURUKUL_CONNECT_POST_ENDPOINT,
  LOGIN_POST_ENDPOINT,
  PERSONAL_INFO_GET_ENDPOINT,
  PERSONAL_INFO_POST_ENDPOINT,
  SAINTFROMFAMILY_GET_ENDPOINT,
  SAINT_NAME_GET_ENDPOINT,
  VERIFY_POST_ENDPONT,
} from '@env';
import {getBearerToken} from './AuthServices';
import {ApiDateFormat} from '../utils';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const handleApiResponse = (response: AxiosResponse<any, any>) => {
  const data = {
    resType: response.data.status === 'success' ? 'SUCCESS' : 'ERROR',
    data: response.data.data,
    message: response.data.message,
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
      ...(method === 'get' ? {params: requestData} : {data: requestData}),
    });
    return handleApiResponse(response);
  } catch (error: any) {
    return {
      resType: 'ERROR',
      data: [],
      message: error.toString(),
    };
  }
};

export const LoginByMobileNumApi = async (mobileNum: string) => {
  return await apiRequest(
    LOGIN_POST_ENDPOINT,
    'post',
    {contact: mobileNum},
    {},
    false,
  );
};

export const VerifyOTPApi = async (mobileNum: string, otp: string) => {
  return await apiRequest(
    VERIFY_POST_ENDPONT,
    'post',
    {
      contact: mobileNum,
      otp,
    },
    {},
    false,
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

export const PersonalInfoSaveDetailsApi = async (userPersonalInfo: any) => {
  const payloadData = new FormData();

  Object.keys(userPersonalInfo).map(key => {
    payloadData.append(`${key}`, userPersonalInfo[key]);
  });
  return await apiRequest(PERSONAL_INFO_POST_ENDPOINT, 'post', payloadData, {
    Authorization: `Bearer ${getBearerToken().token}`,
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  });
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
