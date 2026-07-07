import { z } from "zod";

export const reportCreateSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(8),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  address: z.string().min(3),
  category: z.enum(["traffic", "industrial", "construction", "waste", "dust"]),
  severity: z.enum(["low", "moderate", "high", "critical"]),
});
