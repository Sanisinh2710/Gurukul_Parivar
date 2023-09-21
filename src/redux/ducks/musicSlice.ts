import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {Track} from 'react-native-track-player';
import {InitialSongsType, SongType} from '../../types';
import { copyFile } from 'react-native-fs';

let initialState: InitialSongsType = {
  allSongs: [],
  activeTrack: {
    url: '',
  },
  activeTrackPosition: 0,
  selectedCategories: [],
  trackMode : {
    setupMode: 'NONE',
    albumId : undefined,
    albumName : undefined,
  }
};

export const sliderPageSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    ADD_UPDATE_SONGS: (
      state,
      action: PayloadAction<{songs: Array<SongType | Track>}>,
    ) => {
      let newdata: WritableDraft<InitialSongsType> = JSON.parse(
        JSON.stringify(state),
      );

      const SongsFromPayload = action.payload.songs;

      if (newdata.allSongs.length <= 0) {
        SongsFromPayload.forEach(item => {
          newdata.allSongs.push(item);
        });
      } else {
        newdata.allSongs = SongsFromPayload;
      }

      return newdata;
    },
    SET_ACTIVE_TRACKDATA: (
      state,
      action: PayloadAction<{
        activeTrackDataPayload: {track: Track | undefined; position?: number};
      }>,
    ) => {
      let newdata: WritableDraft<InitialSongsType> = JSON.parse(
        JSON.stringify(state),
      );

      const {track, position} = action.payload.activeTrackDataPayload;

      newdata.activeTrack = track;
      if (position) {
        newdata.activeTrackPosition = position;
      }

      return newdata;
    },
    ADD_UPDATE_CATEGORIES: (
      state,
      action: PayloadAction<{categories: Array<string>}>,
    ) => {
      let newdata: WritableDraft<InitialSongsType> = JSON.parse(
        JSON.stringify(state),
      );

      const categories = action.payload.categories;

      if (newdata.selectedCategories.length <= 0) {
        categories.forEach(item => {
          newdata.selectedCategories.push(item);
        });
      } else {
        newdata.selectedCategories = categories;
      }

      return newdata;
    },
    REMOVE_CATEGORY: (state, action: PayloadAction<{index: number}>) => {
      let newdata: WritableDraft<InitialSongsType> = JSON.parse(
        JSON.stringify(state),
      );

      const removeIndex = action.payload.index;

      if (newdata.selectedCategories.length <= 0) {
        newdata.selectedCategories.splice(removeIndex, 1);
      }

      return newdata;
    },
    UPDATE_SETUP_MODE: (
      state,
      action: PayloadAction<{
        setupMode: 'INITIAL' | 'FILTERED' | 'ALBUM' | 'NONE';
        albumId ?: number;
        albumName ?: string;
      }>,
    ) => {
      let newdata: WritableDraft<InitialSongsType> = JSON.parse(
        JSON.stringify(state),
      );  

      const {setupMode , albumId ,albumName} = action.payload;

      newdata.trackMode.setupMode = setupMode;
      if(albumId!=undefined)
      {
      newdata.trackMode.albumId = albumId
      }
      if(albumName != undefined)
      {
        newdata.trackMode.albumName = albumName;
      }

      return newdata;
    },
  },
});

const {actions, reducer} = sliderPageSlice;

export const {
  ADD_UPDATE_SONGS,
  ADD_UPDATE_CATEGORIES,
  SET_ACTIVE_TRACKDATA,
  REMOVE_CATEGORY,
  UPDATE_SETUP_MODE,
} = actions;

export default reducer;
