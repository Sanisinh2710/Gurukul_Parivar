import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {InitialThemeType} from '@types';
import {DarkTheme, LightTheme} from '@utils';
import {WritableDraft} from 'immer/dist/internal';

let initialState: InitialThemeType = {
  theme: LightTheme,
  themeMode: 'default',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    TOGGLE_THEME: (
      state,
      action: PayloadAction<{themeMode: string; variant: 'dark' | 'light'}>,
    ) => {
      const userChoiceThemeMode = action.payload.themeMode;
      const userChoiceThemeVariant = action.payload.variant;

      let newdata: WritableDraft<InitialThemeType> = JSON.parse(
        JSON.stringify(state),
      );

      newdata.themeMode = userChoiceThemeMode;
      newdata.theme =
        userChoiceThemeVariant === 'dark' ? DarkTheme : LightTheme;

      return newdata;
    },
  },
});

const {actions, reducer} = themeSlice;

export const {TOGGLE_THEME} = actions;

export default reducer;
