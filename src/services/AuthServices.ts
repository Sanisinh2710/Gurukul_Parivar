import {storage} from '../storage';

export const isSignedIn = () => {
  let isAuthenticated = false;

  try {
    const auth_token = getAuthToken();

    if (auth_token.resType === 'SUCCESS') {
      if (auth_token.loginData.is_profile_updated === true) {
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }
    } else {
      isAuthenticated = false;
    }
  } catch (error) {
    isAuthenticated = false;
  }

  return isAuthenticated;
};

export const setAuthToken = (loginData: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('auth_token', JSON.stringify(loginData));

    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getAuthToken = () => {
  let resType: 'SUCCESS' | 'ERROR';
  let loginData: {
    mobileNum: string;
    countryCode: string;
    token: string;
    is_profile_updated: boolean;
  } = {
    mobileNum: '',
    countryCode: '',
    token: '',
    is_profile_updated: false,
  };
  try {
    const auth_token = storage.getString('auth_token');
    if (auth_token) {
      const newAuthToken = JSON.parse(auth_token);
      loginData.mobileNum = newAuthToken.mobileNum;
      loginData.countryCode = newAuthToken.countryCode;
      loginData.token = newAuthToken.token;
      loginData.is_profile_updated = newAuthToken.is_profile_updated;
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return {resType, loginData};
};

export const removeAuthToken = () => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.delete('auth_token');
    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }
  return resType;
};

export const isProfilingDone = (mobileNum: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const auth_token = getAuthToken();

    if (auth_token.resType === 'SUCCESS') {
      if (auth_token.loginData.is_profile_updated) {
        resType = 'SUCCESS';
      } else {
        resType = 'ERROR';
      }
    } else {
      resType = 'SUCCESS';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return resType;
};

export const setUserProfilingDone = (status: boolean) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const auth_token = getAuthToken();

    if (auth_token.resType === 'SUCCESS') {
      const newData = auth_token.loginData;
      newData.is_profile_updated = status;

      const settingAuthToken = setAuthToken(newData);
      if (settingAuthToken === 'SUCCESS') {
        resType = 'SUCCESS';
      } else {
        resType = 'ERROR';
      }
    } else {
      resType = 'SUCCESS';
    }
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getBearerToken = () => {
  let resType: 'SUCCESS' | 'ERROR';
  let token: string = '';

  try {
    const auth_token = getAuthToken();
    if (auth_token.resType === 'SUCCESS') {
      token = auth_token.loginData.token;
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return {resType, token};
};
