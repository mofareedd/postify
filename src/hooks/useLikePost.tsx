import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { likePost } from "@/app/_actions/posts"

export default function useLikePost({ queryKey }: { queryKey?: string[] }) {
  const queryClient = useQueryClient()

  const query = useMutation(likeHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey ?? ["posts"])
    },
    onError: (error: any) => catchError(error),
  })

  async function likeHandler(input: {
    postId: string
    userId: string
    action: "0" | "1"
  }) {
    try {
      await likePost(input)
      toast.success(
        input.action === "0"
          ? "You have liked this post!"
          : "You have unliked this post!"
      )
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return query
}
