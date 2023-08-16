import axios from 'axios';

import {
  BASE_URL,
  GURUKUL_BRANCH_GET_ENDPOINT,
  LOGIN_POST_ENDPOINT,
  PERSONAL_INFO_GET_ENDPOINT,
  PERSONAL_INFO_POST_ENDPOINT,
  VERIFY_POST_ENDPONT,
} from '@env';
import {getBearerToken} from './AuthServices';

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

  try {
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
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const VerifyOTPApi = async (mobileNum: string, otp: string) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
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
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const GurukulBranchGetApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(
        `${GURUKUL_BRANCH_GET_ENDPOINT}`,
        {
          headers: {
            Authorization: `Bearer ${bearer_token.token}`,
          },
        },
      );

      if (response.data.status === 'success') {
        data.resType = 'SUCCESS';
        data.data = response.data.data;
        data.message = response.data.message;
      } else {
        data.resType = 'ERROR';
        data.data = response.data.data;
        data.message = response.data.message;
      }
    } else {
      data.resType = 'ERROR';
      data.data = [];
      data.message = `An error occurred..!`;
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const PersonalInfoSaveDetailsApi = async (userPersonalInfo: any) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const payloadData = new FormData();

      Object.keys(userPersonalInfo).map((key, index) => {
        payloadData.append(`${key}`, userPersonalInfo[key]);
      });

      const response = await axiosInstance.post(
        `${PERSONAL_INFO_POST_ENDPOINT}`,
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${bearer_token.token}`,
            'Content-Type': `multipart/form-data`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.status === 'success') {
        data.resType = 'SUCCESS';
        data.data = response.data.data;
        data.message = response.data.message;
      } else {
        data.resType = 'ERROR';
        data.data = response.data.data;
        data.message = response.data.message;
      }
    } else {
      data.resType = 'ERROR';
      data.data = [];
      data.message = `An error occurred..!`;
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const PersonalInfoGetDetailsApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(
        `${PERSONAL_INFO_GET_ENDPOINT}`,
        {
          headers: {
            Authorization: `Bearer ${bearer_token.token}`,
          },
        },
      );

      if (response.data.status === 'success') {
        data.resType = 'SUCCESS';
        data.data = response.data.data;
        data.message = response.data.message;
      } else {
        data.resType = 'ERROR';
        data.data = response.data.data;
        data.message = response.data.message;
      }
    } else {
      data.resType = 'ERROR';
      data.data = [];
      data.message = `An error occurred..!`;
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};
