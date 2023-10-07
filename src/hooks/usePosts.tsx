import { PostTypeWithRelations } from "@/db/schema"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { catchError } from "@/lib/utils"
import { getAllPosts } from "@/app/_actions/posts"

const QUERY_KEY = "posts"

export function usePosts({
  postCount,
  userId,
  queryKey,
}: {
  postCount: number
  userId?: string | null
  queryKey?: string[]
}) {
  const { data: session } = useSession()
  const query = useInfiniteQuery({
    queryKey: queryKey ?? ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const posts = await getAllPosts({
          visitorUserId: session?.user.id ?? null,
          offset: pageParam,
          currentUserId: userId ?? null,
        })

        return { posts, prevOffset: pageParam }
      } catch (error) {
        catchError(error)
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage!.prevOffset + 10 > postCount) {
        return false
      }
      return lastPage!.prevOffset + 10
    },
  })

  return query
}
