import { apiPlaceholder } from "@/lib/api/response";

export function POST() {
  return apiPlaceholder("notifications-dispatch", "POST", "/api/v1/notifications/dispatch");
}
