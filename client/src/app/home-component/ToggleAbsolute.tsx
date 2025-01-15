import { ThemeToggle } from "@/utils/theme/theme-toggle";
import GoHome from "./GoHome";
import { PushNotificationManager } from "@/utils/service-worker/PushNotification/Manager";

const ToggleAbsolute = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1">
      <PushNotificationManager />
      <GoHome />
      <ThemeToggle />
    </div>
  );
};

export default ToggleAbsolute;
