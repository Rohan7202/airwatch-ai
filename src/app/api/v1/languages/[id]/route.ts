import { apiPlaceholder } from "@/lib/api/response";

export function GET() {
  return apiPlaceholder("languages", "GET", "/api/v1/languages/:id");
}

export function PATCH() {
  return apiPlaceholder("languages", "PATCH", "/api/v1/languages/:id");
}

export function DELETE() {
  return apiPlaceholder("languages", "DELETE", "/api/v1/languages/:id");
}
