import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import PostsList from "@/components/posts-list"
import { getAllPosts, getUserPosts } from "@/app/_actions/posts"

export const revalidate = 0
export default async function UserPosts({
  params,
}: {
  params: {
    userId: string
  }
}) {
  // const results = await getUserPosts("moe_dev")
  const session = await getServerSession(authOptions)
  const posts = await getUserPosts(params.userId, session?.user.id ?? null)
  return (
    <div className="flex-1">
      <PostsList posts={posts} />
      {/* <PostsList posts={posts} /> */}
    </div>
  )
}
