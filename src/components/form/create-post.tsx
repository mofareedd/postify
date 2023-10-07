"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Button, Card, Textarea } from "@nextui-org/react"
import { Send } from "lucide-react"
import { User } from "next-auth"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { postSchema } from "@/lib/validation/post"
import useCreatePost from "@/hooks/useCreatePost"

import UploadFile from "../upload-file"

type PostInput = z.infer<typeof postSchema>
export default function CreatePost({ user }: { user: User }) {
  const [files, setFiles] = React.useState<any[] | null>(null)
  const { mutateAsync, isLoading, isUploading } = useCreatePost()

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  })

  async function onSubmit(data: PostInput) {
    await mutateAsync({
      content: data.content,
      currentUserId: user.id,
      images: data.images,
    }).then(() => {
      form.reset()
      setFiles(null)
    })
  }
  return (
    <Card className="p-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-2"
      >
        <Avatar
          isBordered
          size="sm"
          color="default"
          src={user.image ?? ""}
          className="mt-2"
        />
        <div className="relative  flex-1">
          <Textarea
            {...form.register("content")}
            minRows={1}
            placeholder="What's in your mind..."
            isDisabled={isLoading}
          />
          <UploadFile
            setValue={form.setValue}
            name="images"
            maxSize={1024 * 1024 * 4}
            files={files}
            setFiles={setFiles}
            isUploading={isUploading}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          isIconOnly
          isLoading={isLoading}
          isDisabled={isLoading}
          color="warning"
          variant="faded"
          className="mt-2"
          aria-label="Take a photo"
        >
          {!isLoading ? <Send className="h-4 w-4" /> : null}
        </Button>
      </form>
    </Card>
  )
}
