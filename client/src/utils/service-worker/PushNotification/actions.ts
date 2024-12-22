"use server";

import webpush, { type PushSubscription } from "web-push";

webpush.setVapidDetails(
  process.env.WEBPUSH_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export const saveSubscription = async (sub: PushSubscription) => {
  subscription = sub;
};

export const deleteSubscription = async () => {
  subscription = null;
};

export const sendTestNotification = async () => {
  if (!subscription) return;
  try {
    webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: "This is a test notification",
        icon: "/icon.png",
        badge: "/icon.png",
        primaryKey: "123",
      })
    );
  } catch (error) {
    console.error("Error sending notification", error);
  }
};
