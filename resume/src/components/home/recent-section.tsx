type RecentSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const RecentSection = ({ title, children, className }: RecentSectionProps) => {
  return (
    <div>
      <h3
        className={"capitalize text-2xl font-bold border-b text-foreground/80"}
      >
        {title}
      </h3>
      <div
        className={`py-3 grid grid-cols-1 md:grid-cols-[0.75fr_0.75fr] lg:grid-cols-[0.75fr_0.75fr_0.75fr] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RecentSection;
