"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/hooks/state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Viewer } from "@/utils/Markdown";
import { useEffect, useState } from "react";
import { SongContent } from "@/types/songs";

import { addSongContents } from "@/utils/state/song-contents";
import { useDispatch } from "react-redux";

const LyricsDetail = () => {
  const currentSong = useAppSelector((state) => state.currentSong);
  const songContents = useAppSelector((state) => state.songContents);
  const [songContent, setSongContent] = useState<SongContent | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentSong || currentSong.id === "init") return;
    const sct = songContents.find((ct) => ct.id === currentSong.id);
    if (sct) {
      setSongContent(sct);
    } else {
      fetch(`/lyrics/api/${currentSong.id}`)
        .then((res) => res.json())
        .then((response) => {
          if ("error" in response) {
            alert("Failed to fetch lyrics");
            return;
          }
          dispatch(addSongContents(response.data));
          setSongContent(response.data);
        });
    }
  }, [currentSong, songContents, dispatch]);

  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {songContent && (
          <>
            <Image
              src={currentSong.albumCover}
              alt={currentSong.title}
              width={100}
              height={100}
              className="rounded-lg w-1/3"
            />
            <h1>{currentSong.title}</h1>
            <h3>{currentSong.artist}</h3>
            <Viewer value={songContent.lyrics} />
          </>
        )}
        {!songContent && <p>Loading...</p>}
      </div>
    </ScrollArea>
  );
};

export default LyricsDetail;
