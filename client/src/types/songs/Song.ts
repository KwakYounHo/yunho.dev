export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
}

export interface SongContent {
  id: string;
  lyrics: string;
  analysis: string;
  generateState: number;
}

export interface CurrentSong {
  id: string;
}
