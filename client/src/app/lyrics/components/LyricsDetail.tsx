"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/hooks/state";
import { Viewer } from "@/utils/Markdown";
import { useEffect, useState } from "react";
import { SongContent } from "@/types/songs";
import { addSongContents } from "@/utils/state/song-contents";
import { useDispatch } from "react-redux";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const LyricsDetail = () => {
  const songs = useAppSelector((state) => state.songs);
  const currentSong = useAppSelector((state) => state.currentSong);
  const songContents = useAppSelector((state) => state.songContents);
  const [songContent, setSongContent] = useState<SongContent | null>(null);
  const [tab, setTab] = useState<"lyrics" | "analysis">("lyrics");
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
    <ScrollArea className="w-full h-[90dvh] px-4">
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
            <div className="flex gap-4">
              <Button onClick={() => setTab("lyrics")}>가사</Button>
              <Button onClick={() => setTab("analysis")}>분석</Button>
            </div>
            {tab === "lyrics" && (
              <Viewer value={songContent.lyrics} className="animation-in" />
            )}
            {tab === "analysis" &&
              (songContent.analysis ? (
                <Viewer value={songContent.analysis} className="animation-in" />
              ) : (
                <div className="mt-2 text-center w-full animation-in">
                  <p className="text-lg">아직 분석이 등록되지 않았습니다.</p>
                </div>
              ))}
          </>
        )}
        {songs.length === 0 && <p>표시할 데이터가 없습니다</p>}
        {songs.length > 0 && !songContent && <p>Loading...</p>}
      </div>
    </ScrollArea>
  );
};

export default LyricsDetail;
