import { storage } from '../storage';

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
    primary_email: string;
    token: string;
    is_profile_updated: boolean;
  } = {
    primary_email: '',
    token: '',
    is_profile_updated: false,
  };
  try {
    const auth_token = storage.getString('auth_token');
    if (auth_token) {
      const newAuthToken = JSON.parse(auth_token);
      loginData.primary_email = newAuthToken.primary_email;
      loginData.token = newAuthToken.token;
      loginData.is_profile_updated = newAuthToken.is_profile_updated;
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return { resType, loginData };
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

export const isProfilingDone = () => {
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

// export const setBearerToken = (bearerToken: string) => {
//   let resType: 'SUCCESS' | 'ERROR';

//   try {
//     storage.set('bearer_token', JSON.stringify(bearerToken));

//     resType = 'SUCCESS';
//   } catch (error) {
//     resType = 'ERROR';
//   }

//   return resType;
// };

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
  return { resType, token };
};

// export const setUserData = (userdata: any) => {
//   let resType: 'SUCCESS' | 'ERROR';

//   try {
//     storage.set('currentUser', JSON.stringify(userdata));

//     resType = 'SUCCESS';
//   } catch (error) {
//     resType = 'ERROR';
//   }

//   return resType;
// };

// export const getUserData = () => {
//   let resType: 'SUCCESS' | 'ERROR';
//   let userdata: any = {};

//   try {
//     const udata = storage.getString('currentUser');
//     if (udata) {
//       userdata = JSON.parse(udata);
//       resType = 'SUCCESS';
//     } else {
//       resType = 'ERROR';
//     }
//   } catch (error) {
//     resType = 'ERROR';
//   }
//   return {resType, userdata};
// };

export const setAuthCredentialsForAutoFill = (userdata: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('autofillCredentials', JSON.stringify(userdata));

    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getAuthCredentialsForAutoFill = () => {
  let resType: 'SUCCESS' | 'ERROR';
  let userdata: any = {};

  try {
    const udata = storage.getString('autofillCredentials');
    if (udata) {
      userdata = JSON.parse(udata);
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return { resType, userdata };
};
