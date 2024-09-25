import Link from "next/link";
import { cn } from "@/lib/utils";

// ui components
import {
  Avatar as AvatarCircle,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Avatar = () => {
  return (
    <Link href="/">
      <AvatarCircle className={cn("shadow-md")}>
        <AvatarImage src={"/favicon.ico"} />
        <AvatarFallback>YH</AvatarFallback>
      </AvatarCircle>
    </Link>
  );
};

export default Avatar;
