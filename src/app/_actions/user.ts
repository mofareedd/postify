"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { profileSchema } from "@/lib/validation/profile"

export async function updateProfile(
  input: z.infer<typeof profileSchema>,
  id: string
) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })

  if (!user) {
    throw new Error("User not found")
  }

  await db.update(users).set(input).where(eq(users.id, id))
}

export async function getUserById(id: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
