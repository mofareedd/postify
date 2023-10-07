import { useState } from "react"
import { PostTypeWithRelations } from "@/db/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { deletePost } from "@/app/_actions/posts"

function usePostDeletion({
  post,
  currentUserId,
  queryKey,
}: {
  post: PostTypeWithRelations
  currentUserId: string | null
  queryKey?: string[]
}) {
  const queryClient = useQueryClient()

  const query = useMutation(deletePostHandler, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey ?? ["posts"])
    },
    onError: (error: any) => catchError(error),
  })

  async function deletePostHandler() {
    if (post.authorId !== currentUserId) {
      toast.error("You are not allowed to delete this post")
      return
    }
    toast.promise(deletePost(post, currentUserId), {
      loading: "Deleting post...",
      success: "Post deleted successfully",
      error: (err: any) => {
        throw new Error(err)
      },
    })
  }

  return query
}

export default usePostDeletion
