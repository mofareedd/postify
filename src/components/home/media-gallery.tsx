"use client"

import React from "react"
import { PostType } from "@/db/schema"
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react"

export default function MediaGallary({ posts }: { posts: PostType[] }) {
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
        <div className="grid grid-cols-3 gap-2  ">
          {Array.from({ length: 8 }).map((_, i) => (
            <Image
              key={i}
              width={150}
              height={200}
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1695105875900-3b75051bc326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2972&q=80"
              alt="test"
            />
          ))}

          {/* {posts && posts.length ? posts.map((post)=> console.log('')) :null} */}
        </div>
      </CardBody>
    </Card>
  )
}
