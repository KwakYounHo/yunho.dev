import { SongContent } from "@/types/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SongContent[] = [];

const songContentsSlice = createSlice({
  name: "songContents",
  initialState,
  reducers: {
    setSongContents: (state, action: PayloadAction<SongContent[]>) => {
      state = [...state, ...action.payload];
    },
  },
});

export const { setSongContents } = songContentsSlice.actions;
export default songContentsSlice.reducer;
