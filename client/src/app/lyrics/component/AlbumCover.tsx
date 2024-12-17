"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/state";
import { cn } from "@/lib/utils";

const AlbumCover: FC = () => {
  const currentSong = useAppSelector((state) => state.currentSong);
  const [opacity, setOpacity] = useState(0);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [nextSrc, setNextSrc] = useState<string | null>(null);

  useEffect(() => {
    setOpacity(0);
    if (currentSong.id === "init") return;
    if (prevSrc === null) {
      setTimeout(() => {
        setPrevSrc(currentSong.albumCover);
      }, 300);
    }
    setNextSrc(currentSong.albumCover);
    const timer = setTimeout(() => {
      setPrevSrc(currentSong.albumCover);
      setNextSrc(null);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentSong.id, prevSrc, currentSong.albumCover]);

  if (currentSong.id === "init") return null;
  const hSize = "h-[100vh]";

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {nextSrc && (
        <Image
          src={nextSrc}
          alt="Album Cover"
          className={cn(
            "w-full object-cover transition-opacity duration-500 absolute",
            hSize,
            opacity === 1 ? "opacity-100" : "opacity-0"
          )}
          width={1000}
          height={1000}
          onLoad={() => setOpacity(1)}
        />
      )}
      {prevSrc && (
        <Image
          src={prevSrc}
          alt="Album Cover"
          className={cn("w-full object-cover", hSize, "filter drop-shadow-btm")}
          width={1000}
          height={1000}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/90"></div>
      <div className={cn("absolute inset-0 bg-background/90", hSize)} />
    </div>
  );
};

export default AlbumCover;
