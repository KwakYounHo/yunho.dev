import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songs";
import songContentsReducer from "./song-contents";
import currentSongReducer from "./current-song";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songContents: songContentsReducer,
    currentSong: currentSongReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
