"use client"

import React from "react"
import { PostType } from "@/db/schema"
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react"

export default function MediaGallary({ posts }: { posts: PostType[] }) {
  const [counter, setCounter] = React.useState(0)
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
        {posts && posts.length ? (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post, i) => {
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
        ) : null}
        {!counter ? (
          <p className="whitespace-nowrap text-center text-sm text-default-500">
            There is no media to display
          </p>
        ) : null}
      </CardBody>
    </Card>
  )
}
