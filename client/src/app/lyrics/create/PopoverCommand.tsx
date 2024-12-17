"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Command, CommandList, CommandGroup } from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Values = {
  title: string;
  artist: string;
  albumCover: string;
};

type Setters = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  setAlbumCover: React.Dispatch<React.SetStateAction<string>>;
};

const PopoverCommand = ({
  values,
  setters,
}: {
  values: Values;
  setters: Setters;
}) => {
  const { title, artist, albumCover } = values;
  const { setTitle, setArtist, setAlbumCover } = setters;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFetch = async (keyword: string, signal: AbortSignal) => {
    const response = await fetch(`/lyrics/search?q=${keyword}`, { signal });
    const data = await response.json();
    if (data.error) setSearchResult([]);
    setSearchResult(data);
  };

  useEffect(() => {
    if (isLoading) return;
    if (search) {
      const abort = new AbortController();
      const timeout = setTimeout(() => {
        setIsLoading(true);
        searchFetch(search, abort.signal);
        setIsLoading(false);
      }, 1500);
      return () => {
        clearTimeout(timeout);
        abort.abort();
      };
    }
  }, [search, isLoading]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          asChild
          className={cn(
            "lg:w-[32rem] w-[20rem] lg:h-[10rem] h-[6rem] justify-start border border-foreground/10 rounded-lg p-2 px-4 hover:bg-primary/10 transition-all duration-300 scale-90 hover:scale-95 hover:cursor-pointer"
          )}
        >
          <div
            className={cn(
              "flex gap-4 items-center w-full max-w-full",
              title && artist && albumCover ? "justify-start" : "justify-center"
            )}
          >
            {albumCover && title && artist ? (
              <>
                <Image
                  src={albumCover}
                  alt={title}
                  width={100}
                  height={100}
                  className="h-[4rem] w-[4rem] lg:h-[6rem] lg:w-[6rem]"
                />
                <div className="flex flex-col gap-1 items-start truncate overflow-hidden">
                  <p className="text-lg font-bold truncate overflow-hidden">
                    {title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate overflow-hidden">
                    {artist}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Search for a song</p>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[32rem] w-[24rem]">
        <Command className="border-foreground/20 border">
          <Input
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <CommandList>
            <CommandGroup>
              {/* <CommandItem> */}
              {searchResult.length === 0 ? (
                <p>검색중...</p>
              ) : (
                <div className="flex flex-col gap-1 items-center">
                  {searchResult.map(
                    (song: {
                      result: {
                        id: string;
                        title: string;
                        artist_names: string;
                        header_image_url: string;
                      };
                    }) => (
                      <Button
                        asChild
                        onClick={() => {
                          setTitle(song.result.title);
                          setArtist(song.result.artist_names);
                          setAlbumCover(song.result.header_image_url);
                        }}
                        key={song.result.id}
                        variant="ghost"
                        className="hover:cursor-pointer"
                      >
                        <div className="flex gap-2 items-center justify-between min-h-[74px] lg:w-[28rem] w-[24rem] border border-foreground/10 drop-shadow-md shadow-foreground/10 rounded-lg p-2 bg-background/50 hover:bg-background/70 transition-all duration-300 hover:scale-105">
                          <Image
                            src={song.result.header_image_url}
                            alt={song.result.title}
                            width={100}
                            height={100}
                            className="lg:h-[4rem] lg:w-[4rem] h-[3rem] w-[3rem]"
                          />
                          <div className="flex flex-col gap-1 items-end truncate overflow-hidden">
                            <p className="text-sm font-bold truncate overflow-hidden">
                              {song.result.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate overflow-hidden">
                              {song.result.artist_names}
                            </p>
                          </div>
                        </div>
                      </Button>
                    )
                  )}
                </div>
              )}
              {/* </CommandItem> */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCommand;
