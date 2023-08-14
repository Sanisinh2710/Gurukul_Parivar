import axios from 'axios';
import {ApiDateFormat} from '../utils';

export const DailyDarshanApi = async (date: Date, time: string) => {
  const newDate = date.toLocaleString('en-US', ApiDateFormat);

  const res = await axios.get(
    `https://gurukul.taskgrids.com/api/v1/daily-darshan?date=${newDate}&time=${time}`,
    {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2ZkNDhiZDI1YWYyNGFhYjJkYjFlMTk1N2UxMmNlOWJhMGIyYjQ3MjQzOTJkMTQ3YTYwNTIwYmI5YzIzOTM4NWM3OTAwOGQ4N2IxMjk1ZDkiLCJpYXQiOjE2OTE3NTE1NDIuNzY2NzYyLCJuYmYiOjE2OTE3NTE1NDIuNzY2NzY0LCJleHAiOjE3MjMzNzM5NDIuNzYxMDQ5LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.fcLZoV6U67N0wIshBgniwQahGURfwrERkodLhkVbuDQzXl5KIYWL_LFc5vIyckKNLuMD0aiYnpbo0LDjcapKqE7ZiZLxtSyuy5HJP28I-lQaxCKDu0ujhxuv32QvobOUUGvBrfUQ4h7sInaNwibzcIWpHqVPyDIGgzZmZQ-0FLUttttHpBnXXjMZdkDWOiZL5QmUE5ymbSkEstLy-QWlG05DMkwaOnC6pKmWav3iRrWtAnQLL9Ndnll1ekBEuhxLUYHcwANO0C5X9KrV_Pg7zTkipuzIZCywVDNbYdK2o4sawpk7LTJD5bNk5AvvgL0JB5HbgoGByq-L16Yna6zcrFSy3dF3kFvCHHJ9Vt4YTYYIJztinGZNVwRqKlO62dlqL7ey5fa_q35M6WQazUA1mENHWbN0YZvsw0nmFzJfMZnRB7GZCYloWu9hbSR0kW-FNJjGQh5cPcqO0DRLr5Y8BsZaoxH4y7Zlpd4tUim8khknVI9Si2p71vlRh0UZlpRFs515gHGgze80El8JAMKHVYuPest1Y4EukzgzrVYqB3uV4JbX-K9uVL0m1jqNoEgGApNONpv_RR4BOZEv-7Sa3KRviTCOZzgbstkMMqJGflio4A2Qz_GX0G2andK5j9bpNj465yUXuBBQFbb72XJRswD2V7eu0tFXcXncZePonHA',
      },
    },
  );
  return res;
};

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
