import { apiPlaceholder } from "@/lib/api/response";

export function POST() {
  return apiPlaceholder("predictions-run", "POST", "/api/v1/predictions/run");
}
