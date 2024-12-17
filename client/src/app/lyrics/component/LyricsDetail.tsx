"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/hooks/state";
import { ScrollArea } from "@/components/ui/scroll-area";

const LyricsDetail = () => {
  const currentSong = useAppSelector((state) => state.currentSong);
  const song = useAppSelector((state) => state.songs).find(
    (song) => song.id === currentSong.id
  );
  return (
    <ScrollArea>
      {song && (
        <>
          <Image
            src={song.albumCover}
            alt={song.title}
            width={100}
            height={100}
          />
          <h1>{song.title}</h1>
          <h3>{song.artist}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </>
      )}
      {!song && <p>Loading...</p>}
    </ScrollArea>
  );
};

export default LyricsDetail;
