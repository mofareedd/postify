import { PostTypeWithRelations } from "@/db/schema"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { catchError } from "@/lib/utils"
import { getAllPosts } from "@/app/_actions/posts"

const QUERY_KEY = "posts"

export function useUserPosts(postCount: number) {
  const { data: session } = useSession()
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const posts = await getAllPosts({
          visitorUserId: session?.user.id ?? null,
          offset: pageParam,
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
