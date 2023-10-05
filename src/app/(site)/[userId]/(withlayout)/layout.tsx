import React from "react"
import { users } from "@/db/schema"
import { ne } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import MediaGallary from "@/components/home/media-gallery"
import Suggests from "@/components/home/suggests"
import Banner from "@/components/user/banner"
import UserTabs from "@/components/user/user-tabs"
import { getAllPosts } from "@/app/_actions/posts"
import { getAllUsers, getUserById } from "@/app/_actions/user"

export default async function UserLayout({
  params,
  children,
}: {
  params: {
    userId: string
  }
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const user = await getUserById(params.userId, session?.user.id ?? null)

  const suggestedUsers = await getAllUsers({
    id: session?.user.id ?? null,
    where: [ne(users.id, params.userId)],
  })

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl pb-10">
      <Banner user={user} />
      <UserTabs userId={user.id} />
      <div className="mt-4 flex gap-4">
        {children}
        <div className="flex w-80 flex-col gap-6">
          {/* <MediaGallary posts={posts} /> */}
          <Suggests users={suggestedUsers} />
        </div>
      </div>
    </main>
  )
}
