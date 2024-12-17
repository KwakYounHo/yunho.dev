import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types/songs";

const initialState: Song = {
  id: "init",
  title: "",
  artist: "",
  albumCover: "",
};

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      return action.payload;
    },
  },
});

export const { setCurrentSong } = currentSongSlice.actions;
export default currentSongSlice.reducer;
