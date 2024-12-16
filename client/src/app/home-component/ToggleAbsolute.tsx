import { ThemeToggle } from "@/utils/theme/theme-toggle";

const ToggleAbsolute = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
  );
};

export default ToggleAbsolute;
