"use client"

import React from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { Spinner } from "@nextui-org/react"
import { Session } from "next-auth"
import InfiniteScroll from "react-infinite-scroll-component"

import { usePosts } from "@/hooks/usePosts"

import CreatePost from "../form/create-post"
import PostCard from "../post-card"
import PostsList from "../posts-list"

interface IProps {
  session: Session | null
  count: number
}
export default function Feed({ count, session }: IProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = usePosts(count)

  const posts: PostTypeWithRelations[] = data?.pages.reduce(
    (acc: any, page) => [...acc, ...page!.posts],
    []
  )

  return (
    <div className="flex flex-1 flex-col gap-4">
      {session?.user ? <CreatePost user={session.user} /> : null}
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
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : null}

          {isLoading ? <Spinner /> : null}
        </div>
      </InfiniteScroll>
    </div>
  )
}
