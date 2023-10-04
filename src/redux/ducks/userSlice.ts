import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {CurrUserDataTypeNested, CurrentUserDataType} from '../../types';

let initialState: CurrentUserDataType = {
  userRole: 'GUEST',
  currUser: {
    id: 0,
    profile: '',
    gender: '',
    father_name: '',
    dob: '',
    blood_group: '',
    secondary_contact_cc: '',
    secondary_contact: '',
    is_secondary_contact_wp: false,
    secondary_email: '',
    branch_id: 0,
    primary_email: '',
    full_name: '',
    primary_contact_cc: '',
    primary_contact: '',
    is_primary_contact_wp: false,
  },
};

export const userSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    SET_USER_DATA: (
      state,
      action: PayloadAction<{
        userData: CurrUserDataTypeNested;
        role?: 'GUEST' | 'USER';
      }>,
    ) => {
      let newdata: WritableDraft<CurrentUserDataType> = JSON.parse(
        JSON.stringify(state),
      );

      const UserDataFromPayload = action.payload.userData;

      newdata.currUser = UserDataFromPayload;
      if (action.payload.role) {
        newdata.userRole = action.payload.role;
      }

      return newdata;
    },
    REMOVE_USER_DATA: (
      state,
      action: PayloadAction<{wantToRemove: boolean}>,
    ) => {
      let newdata: WritableDraft<CurrentUserDataType> = JSON.parse(
        JSON.stringify(state),
      );
      if (action.payload.wantToRemove) {
        newdata.currUser = {} as CurrUserDataTypeNested;
      }

      return newdata;
    },
  },
});

const {actions, reducer} = userSlice;

export const {SET_USER_DATA, REMOVE_USER_DATA} = actions;

export default reducer;
