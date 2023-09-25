import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(3),
  username: z
    .string()
    .min(3)
    .refine((s) => !s.includes(" "), "No Spaces!"),
  bio: z.string().default(""),
})
