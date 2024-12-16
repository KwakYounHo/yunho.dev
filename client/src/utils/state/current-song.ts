import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentSong } from "@/types/songs";

const initialState: CurrentSong = {
  id: "init",
};

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<CurrentSong>) => {
      return action.payload;
    },
  },
});

export const { setCurrentSong } = currentSongSlice.actions;
export default currentSongSlice.reducer;
