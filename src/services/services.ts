import {storage} from '../storage';

export const isSignedIn = () => {
  let isAuthenticated = false;

  try {
    const auth_token = storage.getString('auth_token');
    const profile_token = storage.getString('profile_token');

    if (auth_token && profile_token) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
  } catch (error) {
    isAuthenticated = false;
  }

  return isAuthenticated;
};

export const setUserActivity = (mobileNum: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const allUsers = storage.getString('userActivity');

    if (allUsers) {
      const newAllUsers = JSON.parse(allUsers);
      newAllUsers.push({mobileNum: mobileNum, profileDone: false});

      storage.set('userActivity', JSON.stringify(newAllUsers));
    } else {
      const newAllUsers = [{mobileNum: mobileNum, profileDone: false}];
      storage.set('userActivity', JSON.stringify(newAllUsers));
    }
    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const setAuthToken = (loginData: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('auth_token', JSON.stringify(loginData));
    const resSetUserType = setUserActivity(loginData.mobileNum);
    if (resSetUserType === 'SUCCESS') {
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getAuthToken = () => {
  let resType: 'SUCCESS' | 'ERROR';
  let loginData: {mobileNum: string; countryCode: string} = {
    mobileNum: '',
    countryCode: '',
  };
  try {
    const auth_token = storage.getString('auth_token');
    if (auth_token) {
      const newAuthToken = JSON.parse(auth_token);
      loginData.mobileNum = newAuthToken.mobileNum;
      loginData.countryCode = newAuthToken.countryCode;
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
    const allUsers = storage.getString('userActivity');
    if (allUsers) {
      const newAllUsers = JSON.parse(allUsers);

      const isprofiledone = newAllUsers.find(
        (item: any, index: any) => item.mobileNum === mobileNum,
      ).profileDone;

      if (isprofiledone) {
        resType = 'SUCCESS';
      } else {
        resType = 'ERROR';
      }
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }
  return resType;
};

export const setUserProfilingDone = (mobileNum: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const allUsers = storage.getString('userActivity');
    if (allUsers) {
      const newAllUsers = JSON.parse(allUsers);

      const allNewUsersWithUpdatedstatus = newAllUsers.map(
        (item: any, index: any) => {
          if (item.mobileNum === mobileNum) {
            item.profileDone = true;
          }
          return item;
        },
      );

      storage.set('userActivity', JSON.stringify(allNewUsersWithUpdatedstatus));
      const isSetProfToken = setProfileToken();
      if (isSetProfToken === 'SUCCESS') {
        resType = 'SUCCESS';
      } else {
        resType = 'ERROR';
      }
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const setProfileToken = () => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('profile_token', JSON.stringify(true));
    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getProfileToken = () => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const profile = storage.getString('profile_token');
    if (profile) {
      resType = 'SUCCESS';
    } else {
      resType = 'ERROR';
    }
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const removeProfToken = () => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.delete('profile_token');
    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }
  return resType;
};
