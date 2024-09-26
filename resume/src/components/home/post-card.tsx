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
    <Card className={"w-full justify-self-center px-4"}>
      <CardHeader>
        <div className={"flex items-end justify-between"}>
          <CardTitle className={cn("text-xl font-semibold text-foreground")}>
            {title}
          </CardTitle>
          <CardDescription>{posted_at}</CardDescription>
        </div>
        <div>
          {subject.map((e) => (
            <Badge variant="default">{e}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
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
