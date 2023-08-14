import axios from 'axios';

import {
  ADDRESS_INFO_GET_ENDPOINT,
  ADDRESS_INFO_POST_ENDPOINT,
  BASE_URL,
  DAILY_DARSHAN_GET_ENDPOINT,
  DAILY_QUOTES_GET_ENDPOINT,
  GET_COUNTRIES_ENDPOINT,
  GURUKUL_BRANCH_GET_ENDPOINT,
  LOGIN_POST_ENDPOINT,
  VERIFY_POST_ENDPONT,
} from '@env';
import {getBearerToken} from './AuthServices';
import {ApiDateFormat} from '../utils';

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
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const GetCountriesApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(`${GET_COUNTRIES_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${bearer_token.token}`,
        },
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
    } else {
      data.resType = 'ERROR';
      data.data = [];
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const AddressInfoGetApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(`${ADDRESS_INFO_GET_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${bearer_token.token}`,
        },
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
    } else {
      data.resType = 'ERROR';
      data.data = [];
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};
export const AddressInfoPostApi = async (address_details: any) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.post(
        `${ADDRESS_INFO_POST_ENDPOINT}`,
        {
          address_details: address_details,
        },
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
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};
export const DailyQuotesApi = async (date: Date) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };
  const newDate = date.toLocaleString('en-US', ApiDateFormat);
  const response = await axiosInstance.get(
    `${DAILY_QUOTES_GET_ENDPOINT}?date=${newDate}`,
    {
      headers: {
        Authorization: 'Bearer ' + getBearerToken().token,
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

  return data;
};
export const DailyDarshanApi = async (date: Date, time: string) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };
  const newDate = date.toLocaleString('en-US', ApiDateFormat);

  const response = await axiosInstance.get(
    `${DAILY_DARSHAN_GET_ENDPOINT}?date=${newDate}&time=${time}`,
    {
      headers: {
        Authorization: 'Bearer ' + getBearerToken().token,
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

  return data;
};
