"use client";

import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase/client";

export async function requestFcmToken() {
  if (typeof window === "undefined") return null;
  if (!("Notification" in window) || !("serviceWorker" in navigator)) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) return null;

  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  return getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  });
}
