"use client"

import React from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { useSession } from "next-auth/react"

import CreatePost from "../form/create-post"
import PostCard from "../post-card"

export default function Feed({ posts }: { posts: PostTypeWithRelations[] }) {
  const { data: session } = useSession()
  return (
    <div className="flex flex-1 flex-col gap-4">
      {session?.user ? <CreatePost user={session.user} /> : null}
      {posts && posts.length
        ? posts.map((post) => <PostCard key={post.id} post={post} />)
        : null}
    </div>
  )
}
