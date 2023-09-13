import { createSlice } from "@reduxjs/toolkit";
import { SongControl } from "../../types";

const initialState:SongControl = {
    songIndex: -1,
    status: false,
  };

export const trackSlice = createSlice({
    name:"track",
    initialState,
    reducers :{
        TRACK_CHANGE : (state ,payload) =>{
            
        }
    }
})