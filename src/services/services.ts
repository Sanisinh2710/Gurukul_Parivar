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

export const setOldUsers = (mobileNum: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    const allUsers = storage.getString('old_users');

    if (allUsers) {
      const newAllUsers = JSON.parse(allUsers);
      newAllUsers.push(mobileNum);
      storage.set('old_users', JSON.stringify(newAllUsers));
    } else {
      const newAllUsers = [mobileNum];
      storage.set('old_users', JSON.stringify(newAllUsers));
    }
    resType = 'SUCCESS';
  } catch (error) {
    resType = 'ERROR';
  }

  return resType;
};

export const getOldUsers = () => {
  let resType: 'SUCCESS' | 'ERROR';

  let returnData;

  try {
    const allUsers = storage.getString('old_users');
    if (allUsers) {
      returnData = JSON.parse(allUsers);
      resType = 'SUCCESS';
      return {resType, data: returnData};
    }
  } catch (error) {
    resType = 'ERROR';
    return {resType, data: returnData};
  }
};

export const setAuthToken = (mobileNum: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('auth_token', JSON.stringify(mobileNum));
    const resSetUserType = setOldUsers(mobileNum);
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

export const setProfileToken = (newFormData: any) => {
  let resType: 'SUCCESS' | 'ERROR';

  try {
    storage.set('profile_token', JSON.stringify(newFormData));
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
