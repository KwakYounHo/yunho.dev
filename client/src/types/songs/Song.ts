export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
}

export interface SongContent {
  id: string;
  lyrics: string;
  analysis: string;
}

export interface CurrentSong {
  id: string;
}
