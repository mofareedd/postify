"use client"

import React from "react"
import { PostType, PostTypeWithRelations, UserType } from "@/db/schema"
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import { usePosts } from "@/hooks/usePosts"
import { getAllPosts } from "@/app/_actions/posts"

const queryKey = ["media"] // Define queryKey outside of the configuration object

export default function MediaGallary({ user }: { user: UserType }) {
  const [counter, setCounter] = React.useState(0)

  // const { data, isLoading } = useQuery<PostTypeWithRelations[], any>(
  //   ["media"],
  //   fetchPosts,
  //   {
  //     onError: (err: any) => console.log(err),
  //   }
  // )

  // console.log(data)
  // async function fetchPosts() {
  //   try {
  //     const posts = await getAllPosts({ offset: 0, currentUserId: user.id })

  //     console.log(posts)
  //     return posts
  //   } catch (err: any) {
  //     console.log(err)
  //     throw new Error(err)
  //   }
  // }
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex w-full justify-between">
          <h4 className="text-lg">Media</h4>
          <Link href="/" color="danger">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardBody>
        {/* {data && data.length ? (
          <div className="grid grid-cols-3 gap-2">
            {data.map((post, i) => {
              if (!post.images?.length) return
              setCounter((prevCounter) => prevCounter + 1)
              return (
                <Image
                  key={post.id}
                  width={150}
                  height={200}
                  className="cursor-pointer"
                  src={post.images[0].url}
                  alt={"post image"}
                />
              )
            })}
          </div>
        ) : null} */}
        {!counter ? (
          <p className="whitespace-nowrap text-center text-sm text-default-500">
            There is no media to display
          </p>
        ) : null}
      </CardBody>
    </Card>
  )
}
