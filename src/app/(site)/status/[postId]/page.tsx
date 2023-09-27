import React from "react"

import CommentsList from "@/components/comments-list"
import ProfileInfo from "@/components/home/profile-info"
import Suggests from "@/components/home/suggests"
import PostCard from "@/components/post-card"
import { getPost } from "@/app/_actions/posts"

export default async function page({
  params,
}: {
  params: { userId: string; postId: string }
}) {
  const post = await getPost(params.postId)

  if (!post) return null
  return (
    <main className="flex min-h-screen flex-row gap-6 px-10 pb-10">
      <div className="flex max-w-[340px] flex-col gap-6">
        <ProfileInfo />
        <Suggests />
      </div>
      <PostCard post={post} />
      <div className="w-full max-w-sm">
        <CommentsList
          comments={post.comments}
          postAuthorName={params.userId}
          postId={params.postId}
        />
      </div>
      {/* <div className="flex w-full max-w-[340px] flex-col gap-6" /> */}
    </main>
  )
}
