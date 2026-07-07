"use client";

import { useEffect } from "react";
import { requestFcmToken } from "@/lib/firebase/messaging";
import { apiFetch } from "@/lib/api/client";

export function useFcmRegistration(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    void (async () => {
      const token = await requestFcmToken();
      if (!token) return;

      await apiFetch<{ ok: true }>("/api/v1/notifications/device-token", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });
    })();
  }, [enabled]);
}
