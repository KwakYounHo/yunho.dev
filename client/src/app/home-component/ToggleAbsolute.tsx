import { ThemeToggle } from "@/utils/theme/theme-toggle";
import { PushNotificationManager } from "@/utils/service-worker/PushNotification/Manager";
import GoHome from "./GoHome";

const ToggleAbsolute = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <PushNotificationManager />
      <GoHome />
      <ThemeToggle />
    </div>
  );
};

export default ToggleAbsolute;
