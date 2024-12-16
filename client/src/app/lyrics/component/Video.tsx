import { FC } from "react";

interface VideoProps {
  src: string;
}

const Video: FC<VideoProps> = ({ src }) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[20vh] object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 h-[20vh] bg-background/50" />
    </div>
  );
};

export default Video;
