import { z } from "zod";

export const authSessionSchema = z.object({
  idToken: z.string().min(1),
});
