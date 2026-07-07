import { z } from "zod";

export const profilePatchSchema = z.object({
  fullName: z.string().min(2).optional(),
  language: z.string().min(2).max(10).optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
  avatarUrl: z.string().url().optional(),
  notificationPreferences: z
    .object({
      critical: z.boolean().optional(),
      tasks: z.boolean().optional(),
      digest: z.boolean().optional(),
    })
    .optional(),
});
