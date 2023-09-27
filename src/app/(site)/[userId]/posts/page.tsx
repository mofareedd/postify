import React from "react"

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
  const posts = await getUserPosts(params.userId)
  return (
    <div className="flex-1">
      <PostsList posts={posts} />
    </div>
  )
}
