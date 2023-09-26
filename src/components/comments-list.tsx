"use client"

import React from "react"
import { CommentsType, CommentTypeWithRelations } from "@/db/schema"
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react"
import { useSession } from "next-auth/react"

import CreateComment from "./form/create-comment"

export default function CommentsList({
  comments,
  postId,
  postAuthorName,
}: {
  comments: CommentTypeWithRelations[]
  postId: string
  postAuthorName: string
}) {
  const { data: session } = useSession()
  return (
    <Card className="h-screen overflow-y-scroll">
      <h2 className="px-6 py-2 text-lg font-bold">Comments</h2>
      {session ? (
        <CreateComment
          user={session.user}
          postAuthorName={postAuthorName}
          postId={postId}
        />
      ) : null}
      <div className="flex flex-col gap-2">
        {comments && comments.length
          ? comments.map((el) => <CommentBox key={el.id} comment={el} />)
          : null}
      </div>
    </Card>
  )
}

function CommentBox({ comment }: { comment: CommentTypeWithRelations }) {
  return (
    <div className="px-6 py-2">
      <div className="flex items-start gap-2">
        <Avatar
          isBordered
          size="sm"
          color="default"
          src={comment.author.image ?? ""}
          name={comment.author.name ?? ""}
        />

        <div className="min-h-[50px] min-w-[100px] max-w-[300px] p-1">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="flex flex-col items-start">
              <p className="text-xs font-bold">{comment.author.name}</p>
              <span className="text-[10px] text-default-500">
                @{comment.author.username}
              </span>
            </div>

            <span className="text-[10px] text-default-500">3d ago</span>
          </div>

          <p className="whitespace-pre-line text-xs text-default-500">
            {comment.content}
          </p>
        </div>
      </div>
      <div className="h-1 w-full border-b border-default-100 pt-2"></div>
    </div>
  )
}
