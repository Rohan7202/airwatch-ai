import { apiPlaceholder } from "@/lib/api/response";

export function GET() {
  return apiPlaceholder("health", "GET", "/api/v1/health");
}
