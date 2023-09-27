import React from "react"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { toast } from "sonner"
import { z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { postSchema } from "@/lib/validation/post"
import { createPost } from "@/app/_actions/posts"
import { OurFileRouter } from "@/app/api/uploadthing/core"

const { useUploadThing } = generateReactHelpers<OurFileRouter>()
function useCreatePost() {
  const [isLoading, setIsLoading] = React.useState(false)
  const { isUploading, startUpload } = useUploadThing("imageUploader")

  async function createPostHandler(
    data: z.infer<typeof postSchema>,
    currentUserId: string
  ) {
    setIsLoading(true)
    try {
      const images = isArrayOfFile(data.images)
        ? await startUpload(data.images).then((res) => {
            const formattedImages = res?.map((image) => ({
              id: image.key,
              name: image.key.split("_")[1] ?? image.key,
              url: image.url,
            }))
            return formattedImages ?? null
          })
        : null

      await createPost({
        content: data.content,
        images,
        authorId: currentUserId,
      })

      toast.success("Post created successfully")
    } catch (error) {
      catchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isUploading, createPostHandler }
}

export default useCreatePost