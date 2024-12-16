import { FC } from "react";
import Image from "next/image";

interface GravatarProps {
  size?: number;
  className?: string;
}

const Gravatar: FC<GravatarProps> = ({ size = 200, className }) => {
  const url = `https://www.gravatar.com/avatar/${process.env.EMAIL}?s=${size}&d=identicon`;

  return (
    <Image
      src={url}
      alt="Gravatar"
      className={`rounded-full ${className}`}
      width={size}
      height={size}
    />
  );
};

export default Gravatar;
