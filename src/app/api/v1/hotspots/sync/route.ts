import { adminDb } from "@/lib/firebase/admin";

const LOCATIONS = [
  { title: "Master Canteen", lat: 20.2648, lng: 85.8400 },
  { title: "KIIT Square", lat: 20.3556, lng: 85.8195 },
  { title: "Jaydev Vihar", lat: 20.2961, lng: 85.8245 },
  { title: "Patia", lat: 20.3545, lng: 85.8272 },
  { title: "Rasulgarh", lat: 20.2878, lng: 85.8715 },
  { title: "Khandagiri", lat: 20.2565, lng: 85.7804 },
  { title: "Airport", lat: 20.2444, lng: 85.8178 },
  { title: "Chandrasekharpur", lat: 20.3325, lng: 85.8240 },
];

export async function GET() {
  const response = await fetch(
    "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=20.2961&longitude=85.8245&hourly=us_aqi,pm2_5,pm10",
    { cache: "no-store" },
  );

  const data = await response.json();

  const aqi = data.hourly.us_aqi[0];
   const batch = adminDb.batch();

  for (let i = 0; i < LOCATIONS.length; i++) {
    const location = LOCATIONS[i];

    const riskScore = Math.min(100, aqi + (i % 5) * 4);

    const ref = adminDb.collection("Hotspots").doc();

    batch.set(ref, {
      id: ref.id,
      title: location.title,
      latitude: location.lat,
      longitude: location.lng,
      riskScore,
      latestAqi: riskScore,
      status: "active",
      sourceReportIds: [],
      recommendedAction: "Monitor air quality",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  await batch.commit();

  return Response.json({
    success: true,
    created: LOCATIONS.length,
  });
}