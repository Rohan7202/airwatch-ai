export function forbidden(message = "Forbidden") {
  return Response.json({ error: message }, { status: 403 });
}

export function unauthorized(message = "Unauthorized") {
  return Response.json({ error: message }, { status: 401 });
}

export function badRequest(error: unknown) {
  const message = error instanceof Error ? error.message : "Invalid request";
  return Response.json({ error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return Response.json({ error: message }, { status: 404 });
}
