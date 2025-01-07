"use client";

import { useEffect, useState } from "react";
import { saveSubscription, deleteSubscription } from "./actions";

import { Toggle } from "@/components/ui/toggle";
import { Bell, BellOff } from "lucide-react";
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
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
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
    } else if (permission === "default") {
      Notification.requestPermission().then(subscribeToPushNotification);
    } else {
      alert("Please allow push notification");
    }
  };

  const unSubscribeFromPushNotification = async () => {
    if (!subscription) return;
    const serialized = JSON.parse(JSON.stringify(subscription));
    subscription.unsubscribe();
    setSubscription(null);
    deleteSubscription(serialized);
  };

  return (
    <>
      {isSupported ? (
        <Button variant={"outline"} size={"icon"} asChild>
          <Toggle
            pressed={subscription !== null}
            onPressedChange={
              subscription
                ? unSubscribeFromPushNotification
                : subscribeToPushNotification
            }
          >
            {subscription !== null ? (
              <Bell className={"w-[1.2rem] h-[1.2rem] text-foreground"} />
            ) : (
              <BellOff className={"w-[1.2rem] h-[1.2rem] text-foreground"} />
            )}
          </Toggle>
        </Button>
      ) : null}
    </>
  );
};
