"use client";

import { useAppSelector } from "@/app/hooks/state";
import { useEffect, useState } from "react";
import { SongContent } from "@/types/songs";

const temp = [
  {
    id: "1q2w3e4r",
    lyrics: "Never mind I'll find someone like you",
    analysis:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, porro aliquam, cumque illum ten tur sint eveniet nulla nesciunt exercitationem harum impedit accusamus fugit laboriosam facilis optio. Ullam doloribus quam dolorum.",
  },
  {
    id: "qwerasdf",
    lyrics:
      "Every night I lie in bed The brightest colors fill my head A million dreams are keeping me awake",
    analysis:
      "However big, however small Let me be part of it all Share your dreams with me You may be right, you may be wrong But say that you'll bring me along To the world you see To the world I close my eyes to see I close my eyes to see",
  },
];

const Contents = () => {
  const [songContent, setSongContent] = useState<SongContent>();
  const currentSong = useAppSelector((state) => state.currentSong);
  // const songContents = useAppSelector((state) => state.songContents);

  useEffect(() => {
    setSongContent(temp.find((item) => item.id === currentSong.id));
  }, [currentSong]);

  return songContent ? (
    <div className="h-[60vh]">
      <p>{songContent.lyrics}</p>
      <p>{songContent.analysis}</p>
    </div>
  ) : (
    <div className="h-[60vh]">
      <p>Loading...</p>
    </div>
  );
};

export default Contents;
