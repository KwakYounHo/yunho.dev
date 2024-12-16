import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songs";
import songContentsReducer from "./song-contents";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songContents: songContentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
