import MenuTitle from "@/components/ui/menu-title";
import { cn } from "@/lib/utils";

const ContentSection = ({
  title,
  children,
  className,
  subTitle,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  subTitle?: string;
}) => {
  const id = title.toLowerCase().replace(/\s/g, "-");

  return (
    <div id={id} className={cn("py-8 border-b flex flex-col gap-2", className)}>
      <MenuTitle title={title} subTitle={subTitle} />
      <div className="px-4">{children}</div>
    </div>
  );
};

export default ContentSection;
