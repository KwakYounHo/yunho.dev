const MenuTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <div className={"flex flex-row gap-2 mb-2 items-center"}>
      <h3 className={"capitalize text-2xl font-semibold"}>{title}</h3>
      {subTitle && (
        <p className={"text-sm text-muted-foreground"}>{subTitle}</p>
      )}
    </div>
  );
};
export default MenuTitle;
