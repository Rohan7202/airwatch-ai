import { apiPlaceholder } from "@/lib/api/response";

export function GET() {
  return apiPlaceholder("settings", "GET", "/api/v1/settings");
}

export function POST() {
  return apiPlaceholder("settings", "POST", "/api/v1/settings");
}
