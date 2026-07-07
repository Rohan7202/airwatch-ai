export function apiPlaceholder(resource: string, method: string, path: string) {
  return Response.json({
    phase: "phase-1",
    status: "placeholder",
    resource,
    method,
    path,
    message: "Endpoint contract initialized. Business logic will be implemented in Phase 2.",
  });
}
