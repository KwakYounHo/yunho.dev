import Image from "next/image";
import { cn } from "@/lib/utils";

import { FC } from "react";

const BackGroundImage: FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden h-[100vh]">
      <Image
        src={
          "https://yunhodev.s3.ap-northeast-2.amazonaws.com/public/pexels-dibert-774664.jpg"
        }
        alt="Album Cover"
        className={cn("w-full object-cover h-[100vh] filter drop-shadow-btm")}
        width={1000}
        height={1000}
      />
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-b from-transparent to-background/90"></div>
      <div className={cn("absolute inset-0 bg-background/60 h-[100vh]")} />
    </div>
  );
};

export default BackGroundImage;
