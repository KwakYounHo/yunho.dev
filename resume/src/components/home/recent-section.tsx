import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type RecentSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  page: string;
};

const RecentSection = ({
  title,
  children,
  page,
  className,
}: RecentSectionProps) => {
  const forId = title.replace(/\s/g, "-").toLowerCase();
  return (
    <div id={forId}>
      <div className={"flex justify-between border-b"}>
        <h3 className={"capitalize text-2xl font-bold text-foreground/80"}>
          {title}
        </h3>
        <Link
          href={`/${page}`}
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          더 보기 {">"}
        </Link>
      </div>
      <div
        className={`py-3 grid grid-cols-1 md:grid-cols-[0.75fr_0.75fr] xl:grid-cols-[0.75fr_0.75fr_0.75fr] gap-4 px-3 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RecentSection;
