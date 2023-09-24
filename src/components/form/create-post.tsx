"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Button, Card, Textarea } from "@nextui-org/react"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { CameraIcon, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { postSchema } from "@/lib/validation/post"
import { OurFileRouter } from "@/app/api/uploadthing/core"

import UploadFile from "../upload-file"

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

type PostInput = z.infer<typeof postSchema>
export default function CreatePost() {
  const [files, setFiles] = React.useState<any[] | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const { isUploading, startUpload } = useUploadThing("imageUploader")

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  })

  async function onSubmit(data: PostInput) {
    console.log(data)
  }
  return (
    <Card className="p-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <Avatar
          isBordered
          size="sm"
          color="default"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div className="relative  flex-1">
          <Textarea
            {...form.register("content")}
            minRows={1}
            labelPlacement="outside"
            placeholder="What's in your mind..."
          />
          <UploadFile
            setValue={form.setValue}
            name="images"
            maxSize={1024 * 1024 * 2}
            files={files}
            setFiles={setFiles}
            isUploading={isUploading}
            disabled={isPending}
          />
        </div>
        <Button
          type="submit"
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Take a photo"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  )
}
