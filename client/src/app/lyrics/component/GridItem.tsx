import { cn } from "@/lib/utils";

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

const GridItem = ({ children, className }: GridItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col border border-foreground/20 rounded-lg p-4 shadow-md shadow-foreground/20 w-full bg-background",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GridItem;
