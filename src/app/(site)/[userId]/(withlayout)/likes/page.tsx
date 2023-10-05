import React from "react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import PostCard from "@/components/post-card"
import { getLikedPosts } from "@/app/_actions/posts"

export default async function UserLikes({
  params,
}: {
  params: {
    userId: string
  }
}) {
  const session = await getServerSession(authOptions)
  const posts = await getLikedPosts({
    currentUserId: params.userId,
    visitorUserId: session?.user.id ?? null,
  })

  return (
    <div className="flex-1">
      <div className="flex flex-1 flex-col gap-4">
        {posts && posts.length
          ? posts.map((post) => <PostCard key={post.id} post={post} />)
          : null}
      </div>
    </div>
  )
}
