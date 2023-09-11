import {combineReducers} from 'redux';

import ImageSliderReducer from './ducks/imageSliderslice';
import ThemeReducer from './ducks/themeslice';

import {PersistConfig, persistReducer} from 'redux-persist';
import {reduxStorage} from '../storage';
import {InitialThemeType} from '../types';

const themePersistConfig: PersistConfig<InitialThemeType> = {
  key: 'myTheme',
  storage: reduxStorage,
};

export const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, ThemeReducer),
  sliderPage: ImageSliderReducer,
});
