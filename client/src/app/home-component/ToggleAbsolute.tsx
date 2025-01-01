import { ThemeToggle } from "@/utils/theme/theme-toggle";
import GoHome from "./GoHome";

const ToggleAbsolute = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <GoHome />
      <ThemeToggle />
    </div>
  );
};

export default ToggleAbsolute;
