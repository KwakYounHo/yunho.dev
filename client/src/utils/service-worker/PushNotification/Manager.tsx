"use client";

import { useEffect, useState } from "react";
import {
  saveSubscription,
  deleteSubscription,
  sendTestNotification,
} from "./actions";

import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

function urlBase64ToUnit8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const subscription = await registration.pushManager.getSubscription();
    setSubscription(subscription);
  };

  const subscribeToPushNotification = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUnit8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(subscription);
    const serialized = JSON.parse(JSON.stringify(subscription));
    saveSubscription(serialized);
  };

  const unSubscribeFromPushNotification = async () => {
    subscription?.unsubscribe();
    setSubscription(null);
    deleteSubscription();
  };

  return (
    <>
      {isSupported ? (
        <div className={"flex items-center gap-2"}>
          <Bell className={"w-[1.2rem] h-[1.2rem] text-foreground"} />
          <Switch
            checked={subscription !== null}
            onCheckedChange={
              subscription
                ? unSubscribeFromPushNotification
                : subscribeToPushNotification
            }
          />
          {subscription && (
            <Button onClick={sendTestNotification}>
              Send Test Notification
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};