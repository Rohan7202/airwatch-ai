export interface GeocodeRequest {
  address: string;
}

export interface GeocodeResult {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export async function geocodeAddress(request: GeocodeRequest): Promise<GeocodeResult | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey || !request.address.trim()) return null;

  const endpoint = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  endpoint.searchParams.set("address", request.address);
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint.toString(), { method: "GET" });
  if (!response.ok) return null;

  const json = (await response.json()) as {
    status: string;
    results?: Array<{
      formatted_address: string;
      geometry: { location: { lat: number; lng: number } };
    }>;
  };

  if (json.status !== "OK" || !json.results?.[0]) return null;

  const result = json.results[0];
  return {
    formattedAddress: result.formatted_address,
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
  };
}
