"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { comments, posts, PostType, users } from "@/db/schema"
import { InsertCommentProps, UploadedFile } from "@/types"
import { asc, desc, eq, sql } from "drizzle-orm"
import { utapi } from "uploadthing/server"
import { z } from "zod"

import { postSchema } from "@/lib/validation/post"

export async function getAllPosts() {
  const fetchPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    with: {
      author: true,
      comments: {
        with: {
          author: true,
        },
      },
    },
  })

  return fetchPosts
}

export async function getUserPosts(id: string) {
  const fetchPosts = await db.query.posts.findMany({
    where: eq(posts.authorId, id),
    with: {
      author: true,
      comments: true,
    },
    orderBy: [desc(posts.createdAt)],
  })

  return fetchPosts
}

export async function getPost(id: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      comments: {
        with: {
          author: true,
        },
      },
      author: true,
    },
  })

  // if (!post) {
  //   throw new Error("Post not found")
  // }

  return post
}
export async function createPost(
  input: z.infer<typeof postSchema> & {
    images: UploadedFile[] | null
    authorId: string
  }
) {
  await db.insert(posts).values(input)
  revalidatePath("/")
}

export async function deletePost(input: PostType, currentId: string) {
  if (currentId !== input.authorId) {
    throw new Error("You can't delete this post")
  }

  await db.delete(posts).where(eq(posts.id, input.id))
  revalidatePath("/")
  if (!input.images?.length) return
  await utapi.deleteFiles(input.images.map((file) => file.id))
}

export async function createComment(input: InsertCommentProps) {
  const { postId, content, currentUserId, postAuthorName } = input
  await db.insert(comments).values({ content, authorId: currentUserId, postId })
  revalidatePath(`/${postAuthorName}/${postId}`)
}
