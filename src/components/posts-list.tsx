"use client"

import React from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { Spinner } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useInView } from "react-intersection-observer"

import { getAllPosts, getLikedPosts } from "@/app/_actions/posts"

import PostCard from "./post-card"

interface IProps {
  posts: PostTypeWithRelations[]
  count: number
  currentUserId?: string
  isLikedPosts?: boolean
}

export default function PostsList({
  posts,
  count,
  currentUserId,
  isLikedPosts = false,
}: IProps) {
  const [postsList, setPostsList] = React.useState(posts)
  const { ref, inView, entry } = useInView()
  const [offset, setOffset] = React.useState(0)

  const { data: session } = useSession()

  async function loadPosts() {
    const newOffset = offset + 10

    const newPosts = await getAllPosts({
      offset: newOffset,
      visitorUserId: session?.user.id ?? null,
      currentUserId: currentUserId || null,
    })

    setOffset((prev) => prev + 11)

    if (newPosts && newPosts.length) {
      setPostsList([...postsList, ...newPosts])
    }
  }

  React.useEffect(() => {
    if (inView && offset < count && count > 10) {
      loadPosts()
    }
  }, [inView])
  return (
    <div className="flex flex-1 flex-col gap-4">
      {postsList && postsList.length
        ? postsList.map((post) => <PostCard key={post.id} post={post} />)
        : null}

      <div ref={ref} className="my-2 flex items-center justify-center">
        {offset >= count || count <= 10 ? (
          <p className="text-default-500">You completed all posts</p>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}
