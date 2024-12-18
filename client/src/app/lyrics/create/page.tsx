"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PopoverCommand from "./PopoverCommand";
import MarkdownEditor from "@/utils/Markdown/Editor";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addSong } from "@/utils/state/songs";
import { useRouter } from "next/navigation";

const CreateLyrics = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFetching) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    data["lyrics"] = lyrics;
    setIsFetching(true);
    const response = await fetch("/lyrics/api", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      const result = await response.json();
      dispatch(addSong(result.data));
      alert("Lyrics created successfully");
      setIsFetching(false);
      router.push("/lyrics");
    } else {
      alert("Failed to fetch lyrics");
      setIsFetching(false);
    }
  };

  const values = {
    title,
    artist,
    albumCover,
  };

  const setters = {
    setTitle,
    setArtist,
    setAlbumCover,
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-4 container">
        <PopoverCommand values={values} setters={setters} />
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
          <Input name="id" type="hidden" value={uuidv4()} />
          <Input name="title" type="hidden" value={title} />
          <Input name="artist" type="hidden" value={artist} />
          <Input name="albumCover" type="hidden" value={albumCover} />
          <MarkdownEditor value={lyrics} onChange={setLyrics} />
          <Button type="submit" variant="default">
            Submit
          </Button>
        </form>
      </div>
      {/* 앨범 커버 미리보기 */}
      {albumCover && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={albumCover}
            alt="Album Cover"
            className={cn(
              "w-full object-cover",
              "h-[100vh]",
              "filter drop-shadow-btm"
            )}
            width={1000}
            height={1000}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/90"></div>
          <div
            className={cn("absolute inset-0 bg-background/80", "h-[100vh]")}
          />
        </div>
      )}
    </main>
  );
};

export default CreateLyrics;
