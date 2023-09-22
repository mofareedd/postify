"use client"

import React from "react"
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react"

import CreateComment from "./form/create-comment"

export default function CommentsList() {
  return (
    <Card className="h-screen overflow-y-scroll">
      <h2 className="px-6 py-2 text-lg font-bold">Comments</h2>
      <CreateComment />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((item, index) => (
          <CommentBox key={index} />
        ))}
      </div>
    </Card>
  )
}

function CommentBox() {
  return (
    <div className="px-6 py-2">
      <div className="flex items-start gap-2">
        <Avatar
          isBordered
          size="sm"
          color="default"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />

        <div className="min-h-[50px] min-w-[100px] max-w-[300px] p-1">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="flex flex-col items-start">
              <p className="text-xs font-bold">Mohamed Fareed</p>
              <span className="text-[10px] text-default-500">
                Software Engineering
              </span>
            </div>

            <span className="text-[10px] text-default-500">3d ago</span>
          </div>

          <p className="text-xs text-default-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            eveniet quod, hic voluptatem similique vitae laboriosam voluptatibus
            unde nesciunt, porro nam dolores ipsam neque perspiciatis ut
            voluptas quam magni sunt eum alias earum voluptates. Quas velit
            magnam similique quos ratione, sit labore iusto incidunt eos enim
            nobis soluta commodi? Asperiores!
          </p>
        </div>
      </div>
      <div className="h-1 w-full border-b border-default-100 pt-2"></div>
    </div>
  )
}
