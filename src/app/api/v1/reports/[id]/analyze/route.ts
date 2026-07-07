import { apiPlaceholder } from "@/lib/api/response";

export function POST() {
  return apiPlaceholder("reports-analyze", "POST", "/api/v1/reports/:id/analyze");
}
