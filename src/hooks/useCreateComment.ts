import React from "react"
import { InsertCommentProps } from "@/types"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { createComment } from "@/app/_actions/posts"

function useCreateComment() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function createCommentHandler(input: InsertCommentProps) {
    if (!input.content) return toast.error("Comment can't be empty")
    setIsLoading(true)
    try {
      await createComment(input)
      toast.success("Comment added successfully!")
    } catch (error) {
      catchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    createCommentHandler,
  }
}

export default useCreateComment
