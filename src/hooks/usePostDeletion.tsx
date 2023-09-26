import { useState } from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { deletePost } from "@/app/_actions/posts"

function usePostDeletion(
  post: PostTypeWithRelations,
  currentUserId: string | null
) {
  const [isLoading, setIsLoading] = useState(false)

  const deletePostHandler = async () => {
    if (post.authorId !== currentUserId) {
      toast.error("You are not allowed to delete this post")
      return
    }

    setIsLoading(true)

    try {
      await deletePost(post, currentUserId)
      toast.success("Post deleted")
    } catch (error) {
      catchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, deletePostHandler }
}

export default usePostDeletion
