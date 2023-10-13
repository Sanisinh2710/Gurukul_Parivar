import {combineReducers} from 'redux';

import MusicReducer from './ducks/musicSlice';
import ThemeReducer from './ducks/themeslice';
import CurrentUserReducer from './ducks/userSlice';
import NotificationsReducer from './ducks/notificationSlice';

import {reduxStorage} from '@storage';
import {
  CurrentUserDataType,
  InitialSongsType,
  InitialThemeType,
  IntialNotificationType,
} from '@types';
import {PersistConfig, persistReducer} from 'redux-persist';

const themePersistConfig: PersistConfig<InitialThemeType> = {
  key: 'myTheme',
  storage: reduxStorage,
};

const musicPersistConfig: PersistConfig<InitialSongsType> = {
  key: 'myMusics',
  storage: reduxStorage,
};

const userPersistConfig: PersistConfig<CurrentUserDataType> = {
  key: 'currentUser',
  storage: reduxStorage,
};

const notificationSliceConfig: PersistConfig<IntialNotificationType> = {
  key: 'notification',
  storage: reduxStorage,
};

export const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, ThemeReducer),
  music: persistReducer(musicPersistConfig, MusicReducer),
  currUser: persistReducer(userPersistConfig, CurrentUserReducer),
  notifications: persistReducer(notificationSliceConfig, NotificationsReducer),
});
