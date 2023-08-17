import axios from 'axios';

import {
  ADDRESS_INFO_GET_ENDPOINT,
  ADDRESS_INFO_POST_ENDPOINT,
  BASE_URL,
  DAILY_DARSHAN_GET_ENDPOINT,
  EDUCATION_INFO_GET_ENDPOINT,
  EDUCATION_INFO_POST_ENDPOINT,
  GET_COUNTRIES_ENDPOINT,
  GURUKUL_BRANCH_GET_ENDPOINT,
  GURUKUL_CONNECT_GET_ENDPOINT,
  GURUKUL_CONNECT_POST_ENDPOINT,
  LOGIN_POST_ENDPOINT,
  PERSONAL_INFO_GET_ENDPOINT,
  PERSONAL_INFO_POST_ENDPOINT,
  VERIFY_POST_ENDPONT,
} from '@env';
import {ApiDateFormat} from '../utils';
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
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
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

export const EducationInfoGetApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(
        `${EDUCATION_INFO_GET_ENDPOINT}`,
        {
          headers: {
            Authorization: `Bearer ${bearer_token.token}`,
            'Content-Type': 'application/json',
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
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const EducationInfoPostApi = async (education_details: any) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };
  console.log(education_details);

  try {
    const bearer_token = getBearerToken();
    console.log(bearer_token.token, education_details);

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.post(
        `${EDUCATION_INFO_POST_ENDPOINT}`,
        education_details,
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

export const GurukulConnectGetApi = async () => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.get(
        `${GURUKUL_CONNECT_GET_ENDPOINT}`,
        {
          headers: {
            Authorization: `Bearer ${bearer_token.token}`,
            'Content-Type': 'application/json',
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
      data.message = 'An error occurred..!';
    }
  } catch (error: any) {
    data.resType = 'ERROR';
    data.data = [];
    data.message = error.toString();
  }

  return data;
};

export const GurukulConnectPostApi = async (gurukulInfo: any) => {
  let data: {resType: 'SUCCESS' | 'ERROR'; data: any; message: string} = {
    resType: 'ERROR',
    data: '',
    message: '',
  };

  console.log(gurukulInfo, 'guru');

  try {
    const bearer_token = getBearerToken();

    if (bearer_token.resType === 'SUCCESS') {
      const response = await axiosInstance.post(
        `${GURUKUL_CONNECT_POST_ENDPOINT}`,
        gurukulInfo,
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
