import { FirstImpression } from "./FistImpression";
import { Button } from "@/components/ui/button";

const LeftBox = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="w-full">
        <h2 className="xl:text-9xl lg:text-8xl text-6xl font-bold">Hello</h2>
        <h2 className="xl:text-9xl lg:text-8xl text-6xl font-bold">World :D</h2>
        <div className="flex flex-col gap-2">
          <FirstImpression
            className="w-full h-16 p-8"
            placeholder="What was your first impression of me?"
          />
          <Button variant="default" className="text-foreground">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftBox;
