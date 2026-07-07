import { apiPlaceholder } from "@/lib/api/response";

export function GET() {
  return apiPlaceholder("languages", "GET", "/api/v1/languages");
}

export function POST() {
  return apiPlaceholder("languages", "POST", "/api/v1/languages");
}
