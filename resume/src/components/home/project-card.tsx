import Link from "next/link";

// ui conponents
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

type PostCardProps = {
  title: string;
  period: {
    start: string;
    end?: string;
    isInProgress: boolean;
  };
  stack: string[];
  reference: {
    detail: string;
    github: string;
    href?: string;
  };
  children: React.ReactNode;
};

const ProjectCard = ({
  title,
  period,
  stack,
  reference,
  children,
}: PostCardProps) => {
  return (
    <Card className={"w-full flex flex-col justify-between px-4"}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {period.isInProgress
              ? `${period.start} ~ 진행중`
              : `${period.start} ~ ${period.end}`}
          </CardDescription>
        </div>
        <div className={"flex gap-1 flex-wrap"}>
          {stack.map((e) => (
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
      <CardContent>{children}</CardContent>
      <CardFooter className={"flex gap-1"}>
        <Link
          href={reference.detail}
          className={buttonVariants({ size: "sm", variant: "link" })}
        >
          프로젝트 기술서
        </Link>
        <Link
          href={reference.github}
          className={buttonVariants({ size: "sm", variant: "link" })}
        >
          GitHub Link
        </Link>
        {reference.href && (
          <Link
            href={reference.href}
            className={buttonVariants({ size: "sm", variant: "link" })}
          ></Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
