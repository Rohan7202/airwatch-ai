export interface GeocodeRequest {
  address: string;
}

export interface GeocodeResult {
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export async function geocodeAddress(
  request: GeocodeRequest,
): Promise<GeocodeResult | null> {
  try {
    if (!request.address.trim()) return null;

    const endpoint = new URL("https://nominatim.openstreetmap.org/search");

    endpoint.searchParams.set("q", request.address);
    endpoint.searchParams.set("format", "jsonv2");
    endpoint.searchParams.set("limit", "1");

    const response = await fetch(endpoint.toString(), {
      headers: {
        "User-Agent": "AirWatchAI/1.0",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Body:", text);

    if (!response.ok) return null;

    const json = JSON.parse(text) as Array<{
      display_name: string;
      lat: string;
      lon: string;
    }>;

    if (!json.length) return null;

    return {
      formattedAddress: json[0].display_name,
      latitude: Number(json[0].lat),
      longitude: Number(json[0].lon),
    };
  } catch (err) {
    console.error("GEOCODE ERROR:", err);
    return null;
  }
}