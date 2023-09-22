import React from "react"

import CreatePost from "../form/create-post"
import PostCard from "../post-card"

export default function Feed() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <CreatePost />
      <PostCard />
    </div>
  )
}
