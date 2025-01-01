import GridItem from "./GridItem";
import RightContainer from "./RightContainer";
import LyricsList from "./LyricsList";

const GridWrapper = () => {
  return (
    <div className="lg:grid grid-cols-[0.2fr_0.80fr] gap-4 justify-center items-start">
      <GridItem className="hidden lg:block p-4">
        <LyricsList />
      </GridItem>
      <GridItem>
        <RightContainer />
      </GridItem>
    </div>
  );
};

export default GridWrapper;
