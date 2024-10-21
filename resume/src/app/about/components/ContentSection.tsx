import MenuTitle from "@/components/ui/menu-title";

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

  let classNames: string = "py-8 border-b flex flex-col gap-2";
  if (className) classNames += ` ${className}`;

  return (
    <div id={id} className={classNames}>
      <MenuTitle title={title} subTitle={subTitle} />
      <div className="px-4">{children}</div>
    </div>
  );
};

export default ContentSection;
