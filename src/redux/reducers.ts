import {combineReducers} from 'redux';


import MusicReducer from './ducks/musicSlice';
import ThemeReducer from './ducks/themeslice';

import {PersistConfig, persistReducer} from 'redux-persist';
import {reduxStorage} from '../storage';
import {InitialSongsType, InitialThemeType} from '../types';

const themePersistConfig: PersistConfig<InitialThemeType> = {
  key: 'myTheme',
  storage: reduxStorage,
};

const musicPersistConfig: PersistConfig<InitialSongsType> = {
  key: 'myMusics',
  storage: reduxStorage,
};

export const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, ThemeReducer),
  music: persistReducer(musicPersistConfig, MusicReducer),
});
