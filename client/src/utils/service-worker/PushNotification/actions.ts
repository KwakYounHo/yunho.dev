"use server";

import { type PushSubscription } from "web-push";
import { API_SERVER_URL } from "@/utils/apiServer";

export const saveSubscription = async (sub: PushSubscription) => {
  await fetch(`${API_SERVER_URL}/subscription`, {
    method: "POST",
    body: JSON.stringify(sub),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteSubscription = async (sub: PushSubscription) => {
  await fetch(`${API_SERVER_URL}/subscription`, {
    method: "PUT",
    body: JSON.stringify({ endpoint: sub.endpoint }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
