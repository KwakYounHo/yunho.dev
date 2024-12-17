import { cn } from "@/lib/utils";
import LyricsDetail from "./LyricsDetail";

const RightContainer = () => {
  const hSize = "h-[70vh]";

  return (
    <div className={cn("p-2", hSize)}>
      <LyricsDetail />
    </div>
  );
};

export default RightContainer;
