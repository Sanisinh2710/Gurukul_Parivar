import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IntialNotificationType} from '@types';
import {WritableDraft} from 'immer/dist/internal';

let initialState: IntialNotificationType = {
  status: false,
  notifications: [],
  isNewNotification: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    ADD_OR_UPDATE_NOTIFICATION: (
      state,
      action: PayloadAction<{notifications: Array<any>}>,
    ) => {
      let newdata: WritableDraft<IntialNotificationType> = JSON.parse(
        JSON.stringify(state),
      );
      const notification = action.payload.notifications;

      if (
        newdata.notifications.length !== notification.length &&
        notification.length > 0
      ) {
        newdata.isNewNotification = true;
      }
      newdata.notifications = notification;

      return newdata;
    },
    UPDATE_STATUS: (
      state,
      action: PayloadAction<{status: boolean; isNotification: boolean}>,
    ) => {
      let newdata: WritableDraft<IntialNotificationType> = JSON.parse(
        JSON.stringify(state),
      );

      const {status, isNotification} = action.payload;
      newdata.status = status;
      newdata.isNewNotification = isNotification;

      return newdata;
    },
  },
});

const {actions, reducer} = notificationSlice;

export const {ADD_OR_UPDATE_NOTIFICATION, UPDATE_STATUS} = actions;

export default reducer;
