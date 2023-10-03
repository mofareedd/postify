"use server"

import { db } from "@/db"
import { follows, users } from "@/db/schema"
import { and, eq, isNotNull, sql } from "drizzle-orm"
import { z } from "zod"

import { profileSchema } from "@/lib/validation/profile"

export async function getAllUsers(id?: string | null) {
  const fetchUsers = await db.query.users.findMany({
    where: isNotNull(users.username),
    limit: 10,
    columns: {
      email: false,
      emailVerified: false,
    },
    extras: {
      isFollowed: sql<
        "0" | "1"
      >`EXISTS (SELECT 1 FROM ${follows} WHERE follows.following = users.id AND follows.follower = ${id})`.as(
        "isFollowed"
      ),
    },
  })

  return fetchUsers
}
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
    columns: {
      email: false,
      emailVerified: false,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

export async function followToggle(input: {
  userId: string
  followingId: string
}) {
  const { userId, followingId } = input

  if (!userId || !followingId) {
    throw new Error("user id and following Id are required")
  }
  const isFollowing = await db.query.follows.findFirst({
    where: and(
      eq(follows.follower, userId),
      eq(follows.following, followingId)
    ),
  })

  if (isFollowing) {
    return await db
      .delete(follows)
      .where(
        and(eq(follows.follower, userId), eq(follows.following, followingId))
      )
  }

  const user = await db.insert(follows).values({
    follower: userId,
    following: followingId,
  })

  if (!user) {
    throw new Error("Could not follow user")
  }

  return user
}
