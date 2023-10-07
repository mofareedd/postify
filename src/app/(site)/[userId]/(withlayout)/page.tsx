import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import InfinitiePosts from "@/components/infinite-posts"
import PostsList from "@/components/posts-list"
import { getAllPosts, postsCount } from "@/app/_actions/posts"

export const revalidate = 0
export default async function UserPosts({
  params,
}: {
  params: {
    userId: string
  }
}) {
  const session = await getServerSession(authOptions)
  const posts = await getAllPosts({
    currentUserId: params.userId ?? null,
    offset: 0,
    visitorUserId: session?.user.id ?? null,
  })

  const count = await postsCount(params.userId)

  return (
    <div className="flex-1">
      <InfinitiePosts
        count={count[0].count}
        userId={params.userId}
        queryKey={[params.userId]}
      />
    </div>
  )
}
