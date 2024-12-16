"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks/state";
import { useAppSelector } from "@/app/hooks/state";
import { setCurrentSong } from "@/utils/state/current-song";
import { cn } from "@/lib/utils";

interface LyricsListProps {
  id: string;
  title: string;
  artist: string;
  image: string;
}

const LyricsList = ({ id, title, artist, image }: LyricsListProps) => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.currentSong);

  const handleClick = () => {
    dispatch(setCurrentSong({ id }));
  };

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "w-full h-24 justify-start border border-foreground/10 rounded-lg p-4 hover:bg-primary/10 transition-all duration-300 scale-90 hover:scale-95 hover:cursor-pointer",
        currentSong.id === id && "bg-primary/10 focus:bg-primary/10"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-4 items-center">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="h-16 w-16"
        />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
      </div>
    </Button>
  );
};

export default LyricsList;
