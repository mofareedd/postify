import { useMutation, useQueryClient } from "@tanstack/react-query"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { toast } from "sonner"
import { z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { postSchema } from "@/lib/validation/post"
import { createPost } from "@/app/_actions/posts"
import { OurFileRouter } from "@/app/api/uploadthing/core"

type CreatePostType = z.infer<typeof postSchema> & { currentUserId: string }
const { useUploadThing } = generateReactHelpers<OurFileRouter>()
function useCreatePost() {
  const queryClient = useQueryClient()
  const { isUploading, startUpload } = useUploadThing("imageUploader")

  const query = useMutation(createPostHandler, {
    onSuccess: () => {
      toast.success("Post created successfully")
      queryClient.invalidateQueries(["posts"])
    },
    onError: (error: any) => catchError(error),
  })

  async function createPostHandler(data: CreatePostType) {
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

      return await createPost({
        content: data.content,
        images,
        authorId: data.currentUserId,
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { ...query, isUploading }
}

export default useCreatePost
