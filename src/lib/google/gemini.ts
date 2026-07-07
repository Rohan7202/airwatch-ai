import type { GeminiAnalysis } from "@/types/firestore";

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
}

function normalizeAnalysis(input: Partial<GeminiAnalysis>): GeminiAnalysis {
  const pollutionType =
    input.pollutionType &&
    ["smoke", "dust", "garbage_burning", "industrial_emissions", "construction_dust", "fire", "unknown"].includes(input.pollutionType)
      ? input.pollutionType
      : "unknown";

  const severity =
    input.severity && ["low", "moderate", "high", "critical"].includes(input.severity) ? input.severity : "moderate";

  return {
    pollutionType,
    confidence: Math.max(0, Math.min(1, Number(input.confidence ?? 0.5))),
    severity,
    explanation: input.explanation?.slice(0, 240) ?? "Unable to provide a detailed explanation.",
    suggestedMunicipalAction: input.suggestedMunicipalAction?.slice(0, 240) ?? "Dispatch an inspection team for verification.",
  };
}

export async function analyzePollutionImageWithGemini(params: {
  imageBytes: Buffer;
  mimeType: string;
  reportContext: {
    title: string;
    description: string;
    category: string;
    severity: string;
  };
}): Promise<GeminiAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return normalizeAnalysis({
      pollutionType: "unknown",
      confidence: 0.35,
      severity: "moderate",
      explanation: "Gemini API key is not configured; returning fallback analysis.",
      suggestedMunicipalAction: "Perform manual report validation and site inspection.",
    });
  }

  const prompt = [
    "You are an environmental incident analyst.",
    "Analyze this uploaded image and infer likely pollution signal.",
    "Return strict JSON with keys:",
    "pollutionType: one of smoke|dust|garbage_burning|industrial_emissions|construction_dust|fire|unknown",
    "confidence: number from 0 to 1",
    "severity: one of low|moderate|high|critical",
    "explanation: short explanation",
    "suggestedMunicipalAction: specific municipal action",
    `Context title: ${params.reportContext.title}`,
    `Context description: ${params.reportContext.description}`,
    `Reported category: ${params.reportContext.category}`,
    `Reported severity: ${params.reportContext.severity}`,
  ].join("\n");

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: params.mimeType,
                data: params.imageBytes.toString("base64"),
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    return normalizeAnalysis({
      pollutionType: "unknown",
      confidence: 0.4,
      severity: "moderate",
      explanation: `Gemini request failed with status ${response.status}.`,
      suggestedMunicipalAction: "Perform manual verification due to temporary AI failure.",
    });
  }

  const json = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text = json.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n") ?? "{}";

  try {
    const parsed = JSON.parse(extractJson(text)) as Partial<GeminiAnalysis>;
    return normalizeAnalysis(parsed);
  } catch {
    return normalizeAnalysis({
      pollutionType: "unknown",
      confidence: 0.45,
      severity: "moderate",
      explanation: "Gemini returned a non-JSON response; fallback normalization applied.",
      suggestedMunicipalAction: "Queue report for operator review.",
    });
  }
}
