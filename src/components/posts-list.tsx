import React from "react"
import { CommentsType, PostTypeWithRelations } from "@/db/schema"

import PostCard from "./post-card"

interface IProps {
  posts: PostTypeWithRelations[]
}

export default function PostsList({ posts }: IProps) {
  // posts[0].
  return (
    <div className="flex flex-1 flex-col gap-4">
      {posts && posts.length
        ? posts.map((post) => <PostCard key={post.id} post={post} />)
        : null}
    </div>
  )
}
