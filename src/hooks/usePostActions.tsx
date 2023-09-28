import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { likePost } from "@/app/_actions/posts"

export default function usePostActions() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  async function likeHandler(input: {
    postId: string
    userId: string
    action: "0" | "1"
  }) {
    setIsLoading(true)
    try {
      await likePost(input)
      router.refresh()
      toast.success(
        input.action === "0"
          ? "You have liked this post!"
          : "You have unliked this post!"
      )
    } catch (error) {
      catchError(error)
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  return { likeHandler, isLoading }
}
