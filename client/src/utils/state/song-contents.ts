import { SongContent } from "@/types/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SongContent[] = [];

const songContentsSlice = createSlice({
  name: "songContents",
  initialState,
  reducers: {
    addSongContents: (state, action: PayloadAction<SongContent>) => {
      return [...state, action.payload];
    },
  },
});

export const { addSongContents } = songContentsSlice.actions;
export default songContentsSlice.reducer;
