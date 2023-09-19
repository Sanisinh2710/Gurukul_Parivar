import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {InitialSliderPageType} from '../../types';

let initialState: InitialSliderPageType = {
  currentPage: 0,
  images: [],
};

export const sliderPageSlice = createSlice({
  name: 'sliderPage',
  initialState,
  reducers: {
    CHANGE_PAGE: (state, action: PayloadAction<{nextPage: number}>) => {
      let newdata: WritableDraft<InitialSliderPageType> = JSON.parse(
        JSON.stringify(state),
      );

      newdata.currentPage = action.payload.nextPage;

      return newdata;
    },
    SET_IMAGES: (state, action: PayloadAction<{images: Array<string>}>) => {
      let newdata: WritableDraft<InitialSliderPageType> = JSON.parse(
        JSON.stringify(state),
      );

      if (newdata.images.length <= 0) {
        newdata.images.push(...action.payload.images);
      } else {
        newdata.images = action.payload.images;
      }

      return newdata;
    },
  },
});

const {actions, reducer} = sliderPageSlice;

export const {CHANGE_PAGE, SET_IMAGES} = actions;

export default reducer;
