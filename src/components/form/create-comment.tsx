"use client"

import React from "react"
import { Avatar, Button, Textarea } from "@nextui-org/react"
import { User } from "next-auth"
import { useSession } from "next-auth/react"

import useCreateComment from "@/hooks/useCreateComment"

import { Icons } from "../icons"

interface IProps {
  user: User
  postId: string
  postAuthorName: string
}
export default function CreateComment({
  user,
  postId,
  postAuthorName,
}: IProps) {
  const [content, setContent] = React.useState("")
  const { isLoading, createCommentHandler } = useCreateComment()
  return (
    <div className="mb-2 flex gap-3 border-b border-default-100 p-6 py-2">
      <Avatar
        isBordered
        size="sm"
        color="default"
        src={user.image ?? ""}
        name={user.name ?? ""}
        className="mt-3"
      />
      <div className="flex-1">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          minRows={2}
          isDisabled={isLoading}
          labelPlacement="outside"
          placeholder="Write your comment here..."
        />
      </div>
      <Button
        isIconOnly
        color="default"
        variant="faded"
        aria-label="Take a photo"
        className="mt-3"
        isDisabled={isLoading}
        onClick={() =>
          createCommentHandler({
            content,
            currentUserId: user.id,
            postId,
            postAuthorName,
          }).then(() => setContent(""))
        }
      >
        {!isLoading ? (
          <Icons.send className="h-4 w-4" />
        ) : (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        )}
      </Button>
    </div>
  )
}
