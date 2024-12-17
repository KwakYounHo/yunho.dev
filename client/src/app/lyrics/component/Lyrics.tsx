"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks/state";
import { useAppSelector } from "@/app/hooks/state";
import { setCurrentSong } from "@/utils/state/current-song";
import { cn } from "@/lib/utils";
import { Song } from "@/types/songs";

const LyricsList = (song: Song) => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.currentSong);
  const { id, title, artist, albumCover } = song;

  const handleClick = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "w-full h-24 justify-start border border-foreground/10 rounded-lg p-2 px-4 hover:bg-primary/10 transition-all duration-300 scale-90 hover:scale-95 hover:cursor-pointer",
        currentSong.id === id && "bg-primary/10 focus:bg-primary/10"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-4 items-center w-full">
        <Image
          src={albumCover}
          alt={title}
          width={100}
          height={100}
          className="h-[4rem] w-[4rem]"
        />
        <div className="flex flex-col gap-1 items-start truncate">
          <p className="text-lg font-bold truncate">{title}</p>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>
      </div>
    </Button>
  );
};

export default LyricsList;
