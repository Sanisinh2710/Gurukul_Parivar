import axios from 'axios';

import {BASE_URL, LOGIN_POST_ENDPOINT, VERIFY_POST_ENDPONT} from '@env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const LoginByMobileNumApi = async (mobileNum: string) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  const response = await axiosInstance.post(`${LOGIN_POST_ENDPOINT}`, {
    contact: mobileNum,
  });

  if (response.data.status === 'success') {
    data.resType = 'SUCCESS';
    data.data = response.data.data;
    data.message = response.data.message;
  } else {
    data.resType = 'ERROR';
    data.data = response.data.data;
    data.message = response.data.message;
  }

  return data;
};

export const VerifyOTPApi = async (mobileNum: string, otp: string) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  const response = await axiosInstance.post(`${VERIFY_POST_ENDPONT}`, {
    contact: mobileNum,
    otp: otp,
  });

  if (response.data.status === 'success') {
    data.resType = 'SUCCESS';
    data.data = response.data.data;
    data.message = response.data.message;
  } else {
    data.resType = 'ERROR';
    data.data = response.data.data;
    data.message = response.data.message;
  }

  return data;
};
