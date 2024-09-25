import Avatar from "./logo/avatar";
import Title from "./logo/title";
import Menu from "./nav/menu";

const LeftSideContainer = () => {
  return (
    <div className={"flex items-center gap-4"}>
      <div className={"flex items-center gap-1"}>
        <Avatar />
        <Title />
      </div>
      <Menu />
    </div>
  );
};

export default LeftSideContainer;
