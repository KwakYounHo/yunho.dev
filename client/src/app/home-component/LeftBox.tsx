import { FirstImpression } from "./FistImpression";
import { Button } from "@/components/ui/button";

const LeftBox = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="w-full">
        <h2>Hello</h2>
        <h2>World :D</h2>
        <div className="flex flex-col gap-2">
          <FirstImpression
            className="w-full h-16 p-8"
            placeholder="What was your first impression of me?"
          />
          <Button variant="default" className="text-background">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftBox;
