"use client"

import React from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { Spinner } from "@nextui-org/react"
import InfiniteScroll from "react-infinite-scroll-component"

import { usePosts } from "@/hooks/usePosts"

import PostCard from "./post-card"

interface IProps {
  count: number
  userId?: string | null
  queryKey?: string[]
}

export default function InfinitiePosts({
  count,
  userId = null,
  queryKey,
}: IProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = usePosts({
    postCount: count,
    userId,
    queryKey,
  })

  const posts: PostTypeWithRelations[] = data?.pages.reduce(
    (acc: any, page) => [...acc, ...page!.posts],
    []
  )
  return (
    <InfiniteScroll
      dataLength={posts ? posts.length : 0}
      next={() => fetchNextPage()}
      loader={
        <div className="my-2 flex justify-center">
          <Spinner />
        </div>
      }
      endMessage={
        posts ? (
          <p className="my-4 text-center text-default-500">
            You have seen all posts
          </p>
        ) : null
      }
      hasMore={hasNextPage ?? false}
    >
      <div className="flex flex-1 flex-col gap-4">
        {posts && posts.length
          ? posts.map((post) => (
              <PostCard key={post.id} post={post} queryKey={queryKey} />
            ))
          : null}

        {isLoading ? <Spinner /> : null}
      </div>
    </InfiniteScroll>
  )
}
