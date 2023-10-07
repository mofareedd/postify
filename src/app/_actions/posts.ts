"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { comments, follows, likes, posts, PostType, users } from "@/db/schema"
import { InsertCommentProps, UploadedFile } from "@/types"
import { and, desc, eq, SQL, sql } from "drizzle-orm"
import { utapi } from "uploadthing/server"
import { z } from "zod"

import { getPostsInput, postSchema } from "@/lib/validation/post"

export async function getAllPosts(input: z.infer<typeof getPostsInput>) {
  const where: SQL[] = input.currentUserId
    ? [eq(posts.authorId, input.currentUserId)]
    : []
  const fetchPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    limit: 10,
    where: and(...where),
    offset: input.offset,
    with: {
      author: {
        extras: {
          isFollowed:
            sql<boolean>`EXISTS (SELECT 1 FROM ${follows} WHERE follows.following = posts.authorId AND follows.follower = ${input.visitorUserId})`.as(
              "isFollowed"
            ),
        },
      },
    },
    extras: {
      commentCount:
        sql<string>`(SELECT COUNT(*) FROM comment WHERE postId = posts.id)`.as(
          "comment_count"
        ),
      likeCount:
        sql<string>`(SELECT COUNT(*) FROM ${likes} WHERE postId = posts.id)`.as(
          "like_count"
        ),
      isLiked: sql<
        "0" | "1"
      >`EXISTS (SELECT 1 FROM ${likes} WHERE likes.postId = posts.id AND likes.userId = ${input.visitorUserId})`.as(
        "is_liked"
      ),
    },
  })

  return fetchPosts
}

export async function postsCount(currentUserId?: string) {
  const where: SQL[] = currentUserId ? [eq(posts.authorId, currentUserId)] : []
  return await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(posts)
    .where(and(...where))
}

export async function getPost(id: string, visitorUserId: string | null) {
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
    extras: {
      likeCount:
        sql<string>`(SELECT COUNT(*) from ${likes} WHERE likes.postId = posts.id)`.as(
          "like_count"
        ),
      isLiked: sql<
        "0" | "1"
      >`EXISTS (SELECT 1 FROM ${likes} WHERE likes.postId = posts.id AND likes.userId = ${visitorUserId})`.as(
        "is_liked"
      ),
    },
  })

  if (!post) {
    throw new Error("Post not found")
  }

  return post
}

export async function getLikedPosts(input: {
  currentUserId: string
  visitorUserId: string | null
}) {
  const fetchPosts = await db
    .select({
      id: posts.id,
      authorId: posts.authorId,
      content: posts.content,
      images: posts.images,
      createdAt: posts.createdAt,
      author: users,
      commentsCount: sql<string>`(SELECT COUNT(*) FROM ${comments} WHERE postId = ${posts.id})`,
      likeCount: sql<string>`(SELECT COUNT(*) FROM ${likes} WHERE postId = ${posts.id})`,
      isLiked: sql<
        "0" | "1"
      >`EXISTS(SELECT 1 FROM ${likes} WHERE likes.postId = ${posts.id} AND likes.userId = ${input.visitorUserId})`.as(
        "is_liked"
      ),
    })
    .from(posts)
    .innerJoin(users, eq(users.id, posts.authorId))
    .innerJoin(likes, eq(likes.postId, posts.id))
    .where(eq(likes.userId, input.currentUserId))
    .orderBy(desc(posts.createdAt))

  return fetchPosts
}
export async function createPost(
  input: z.infer<typeof postSchema> & {
    images: UploadedFile[] | null
    authorId: string
  }
) {
  return await db.insert(posts).values(input)
}

export async function deletePost(input: PostType, currentId: string) {
  if (currentId !== input.authorId) {
    throw new Error("You can't delete this post")
  }

  await db.delete(posts).where(eq(posts.id, input.id))
  if (!input.images?.length) return
  await utapi.deleteFiles(input.images.map((file) => file.id))
}

export async function createComment(input: InsertCommentProps) {
  const { postId, content, currentUserId, postAuthorName } = input
  await db.insert(comments).values({ content, authorId: currentUserId, postId })
  revalidatePath(`/${postAuthorName}/${postId}`)
}

export async function likePost({
  postId,
  userId,
  action,
}: {
  postId: string
  userId: string
  action: "0" | "1"
}) {
  if (!postId || !userId || !action) {
    throw new Error("Something went wrong")
  }

  if (action === "0") return await db.insert(likes).values({ postId, userId })

  return await db
    .delete(likes)
    .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
}
