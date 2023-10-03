import { z } from "zod"

export const postSchema = z.object({
  content: z.string().min(1),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
})

export const getPostsInput = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  currentUserId: z.string().or(z.null()),
})
