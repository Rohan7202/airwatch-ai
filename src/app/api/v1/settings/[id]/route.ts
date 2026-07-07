import { apiPlaceholder } from "@/lib/api/response";

export function GET() {
  return apiPlaceholder("settings", "GET", "/api/v1/settings/:id");
}

export function PATCH() {
  return apiPlaceholder("settings", "PATCH", "/api/v1/settings/:id");
}

export function DELETE() {
  return apiPlaceholder("settings", "DELETE", "/api/v1/settings/:id");
}
