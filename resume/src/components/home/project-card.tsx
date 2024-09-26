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

type PostCardProps = {
  title: string;
  stack: string[];
  reference: {
    detail: string;
    github: string;
    href?: string;
  };
  children: React.ReactNode;
};

const ProjectCard = ({ title, stack, reference, children }: PostCardProps) => {
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {stack.map((e) => (
          <Badge>{e}</Badge>
        ))}
      </CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <Link href={reference.detail}>프로젝트 기술서</Link>
      <Link href={reference.github}>GitHub Link</Link>
      {reference.href && <Link href={reference.href}></Link>}
    </CardFooter>
  </Card>;
};

export default ProjectCard;
