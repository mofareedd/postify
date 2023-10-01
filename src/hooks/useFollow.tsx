import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { catchError } from "@/lib/utils"
import { followToggle } from "@/app/_actions/user"

export default function useFollow() {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  async function followHandler(input: {
    userId: string
    followingId: string
    newFollow: boolean
    name: string | null
  }) {
    const { newFollow, followingId, userId, name } = input

    setIsLoading(true)
    try {
      await followToggle({ userId, followingId })
      // router.refresh()
      toast.success(
        newFollow
          ? `You are following ${name ?? ""} successfully`
          : `You have unfollowed ${name ?? ""} successfully`
      )

      router.refresh()
    } catch (error) {
      catchError(error)
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  return { isLoading, followHandler }
}
