"use client";

import Image from "next/image";
import { useAppSelector } from "@/app/hooks/state";
import { Viewer } from "@/utils/Markdown";
import { useEffect, useState, useRef } from "react";
import { SongContent } from "@/types/songs";
import { addSongContents } from "@/utils/state/song-contents";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const LyricsDetail = () => {
  const songs = useAppSelector((state) => state.songs);
  const currentSong = useAppSelector((state) => state.currentSong);
  const songContents = useAppSelector((state) => state.songContents);
  const [songContent, setSongContent] = useState<SongContent | null>(null);
  const [tab, setTab] = useState<"lyrics" | "analysis">("lyrics");
  const dispatch = useDispatch();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentSongChange = useRef(false);

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

  // 스크롤 이벤트
  // 노래 변경시 스크롤
  useEffect(() => {
    // 해석 탭이었다면 가사 탭으로 바꾸기
    if (tab !== "lyrics") {
      setTab("lyrics");
      currentSongChange.current = true;
    }

    const scrollTop = scrollAreaRef.current?.querySelector("[data-scroll-top]");
    if (scrollTop) {
      scrollTop.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSong.id]);

  // 탭 변경시 스크롤
  useEffect(() => {
    // 현재 노래 변경으로 인한 이벤트는 무시
    if (currentSongChange.current) {
      currentSongChange.current = false;
      return;
    }

    const tabScroll = scrollAreaRef.current?.querySelector(
      "[data-change-tab-scroll]"
    );
    if (tabScroll) {
      tabScroll.scrollIntoView({ behavior: "smooth" });
    }
  }, [tab]);

  return (
    <ScrollArea
      className="w-full h-[90dvh] px-4 xl:max-w-[50dvw] mx-auto"
      ref={scrollAreaRef}
    >
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {songContent && (
          <>
            <div data-scroll-top />
            <Image
              src={currentSong.albumCover}
              alt={currentSong.title}
              width={100}
              height={100}
              className="rounded-lg w-1/3"
            />
            <div className="flex flex-col w-full gap-1 justify-center items-center">
              <h1 className="text-xl font-bold">{currentSong.title}</h1>
              <h3 className="text-sm text-muted-foreground">
                {currentSong.artist}
              </h3>
            </div>
            <div className="w-full">
              <div data-change-tab-scroll />
              <div className="flex w-full justify-center items-center sticky top-0 backdrop-blur-sm border border-border">
                <Button
                  className={cn(
                    tab === "lyrics" &&
                      "bg-primary text-background rounded-none",
                    "w-1/2"
                  )}
                  variant="ghost"
                  onClick={() => setTab("lyrics")}
                  disabled={tab === "lyrics"}
                >
                  가사
                </Button>
                <Button
                  className={cn(
                    tab === "analysis" &&
                      "bg-primary text-background rounded-none",
                    "w-1/2"
                  )}
                  variant="ghost"
                  onClick={() => setTab("analysis")}
                  disabled={tab === "analysis"}
                >
                  분석
                </Button>
              </div>
              {tab === "lyrics" && (
                <Viewer value={songContent.lyrics} className="animation-in" />
              )}
              {tab === "analysis" &&
                (songContent.analysis ? (
                  <Viewer
                    value={songContent.analysis}
                    className="animation-in"
                  />
                ) : (
                  <div className="mt-2 text-center w-full animation-in">
                    <p className="text-lg">아직 분석이 등록되지 않았습니다.</p>
                  </div>
                ))}
            </div>
          </>
        )}
        {songs.length === 0 && <p>표시할 데이터가 없습니다</p>}
        {songs.length > 0 && !songContent && <p>Loading...</p>}
      </div>
    </ScrollArea>
  );
};

export default LyricsDetail;
