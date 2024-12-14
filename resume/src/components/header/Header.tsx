// containers
import LeftSideContainer from "./left-side/left-side-container";
import RightSideContainer from "./right-side/right-side-container";

const Header = () => {
  return (
    <header
      className={
        "sticky top-0 z-50 w-full h-[4rem] flex justify-center items-center border-border/40 border-b bg-background/95 backdrop-blur text-foreground"
      }
    >
      <div
        className={
          "container w-full max-w-screen-2xl flex items-center justify-between"
        }
      >
        <div>
          <LeftSideContainer />
        </div>
        <div>
          <RightSideContainer />
        </div>
      </div>
    </header>
  );
};

export default Header;
