import { FC } from "react";

const Video: FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background/50" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="https://yunhodev.s3.ap-northeast-2.amazonaws.com/public/5871003-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video;
