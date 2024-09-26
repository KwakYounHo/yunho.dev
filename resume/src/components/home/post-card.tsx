import Link from "next/link";

// ui components
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PostCardProps = {
  title: string;
  subject: string[];
  children: React.ReactNode;
  posted_at: string;
};

const PostCard = ({ title, subject, children, posted_at }: PostCardProps) => {
  const url = `/posts/view/${encodeURIComponent(title)}`;
  return (
    <Card className={"w-full flex flex-col justify-between px-4"}>
      <CardHeader>
        <div className={"grid grid-cols-[1fr_6rem] gap-4"}>
          <CardTitle className={cn("text-xl font-semibold text-foreground")}>
            {title}
          </CardTitle>
          <CardDescription>{posted_at}</CardDescription>
        </div>
        <div className={"flex gap-1"}>
          {subject.map((e) => (
            <Badge
              key={e}
              variant="default"
              className={"bg-foreground/80 drop-shadow-md"}
            >
              {e}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className={"h-20 md:h-32 overflow-scroll"}>
        {children}
      </CardContent>
      <CardFooter>
        <Link
          href={url}
          className={buttonVariants({
            size: "sm",
            variant: "link",
            className: "px-0 text-muted-foreground/70 hover:text-foreground",
          })}
        >
          자세히
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
