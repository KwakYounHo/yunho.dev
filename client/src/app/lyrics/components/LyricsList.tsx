"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Lyrics from "./Lyrics";
import { Song } from "@/types/songs";
import { useEffect } from "react";
import { SongResponse } from "@/types/externalAPI/Response";
import { useAppSelector, useAppDispatch } from "@/app/hooks/state";
import { setSongs } from "@/utils/state/songs";
import { setCurrentSong } from "@/utils/state/current-song";

interface LyricsListProps {
  setIsOpen?: (isOpen: boolean) => void;
}
const LyricsList = ({ setIsOpen }: LyricsListProps) => {
  const songs = useAppSelector((state) => state.songs);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.currentSong);

  useEffect(() => {
    if (songs.length === 0) {
      fetch("/lyrics/api/")
        .then((res) => res.json())
        .then((response: SongResponse<Song[]>) => {
          if ("data" in response) {
            dispatch(setSongs(response.data));
          } else {
            alert("데이터를 받아오는데 실패했습니다.");
          }
        });
    }
  }, [songs.length, dispatch]);

  useEffect(() => {
    if (currentSong.id !== "init") return;
    dispatch(setCurrentSong(songs[0]));
  }, [songs, currentSong.id, dispatch]);

  return (
    <ScrollArea className="h-[50vh]">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-muted-foreground hidden xl:block">
          Lyrics List
        </h3>
        <div>
          {songs.map((song) => {
            return (
              <div
                onClick={setIsOpen && (() => setIsOpen(false))}
                key={song.id}
              >
                <Lyrics {...song} />
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
};

export default LyricsList;
