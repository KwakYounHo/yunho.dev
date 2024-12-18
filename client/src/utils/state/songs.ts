import { Song } from "@/types/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Song[] = [];

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      return action.payload;
    },
  },
});

export const { setSongs } = songsSlice.actions;
export default songsSlice.reducer;
