import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import PostsList from "@/components/posts-list"
import { getLikedPosts } from "@/app/_actions/posts"

export default async function UserLikes({
  params,
}: {
  params: {
    userId: string
  }
}) {
  const session = await getServerSession(authOptions)
  const posts = await getLikedPosts(params.userId, session?.user.id ?? null)
  return (
    <div className="flex-1">
      <PostsList posts={posts} />
    </div>
  )
}
