import React from "react"

import MediaGallary from "@/components/home/media-gallery"
import Suggests from "@/components/home/suggests"
import Banner from "@/components/user/banner"
import UserTabs from "@/components/user/user-tabs"
import { getUserById } from "@/app/_actions/user"

export default async function UserLayout({
  params,
  children,
}: {
  params: {
    userId: string
  }
  children: React.ReactNode
}) {
  const user = await getUserById(params.userId)

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl pb-10">
      <Banner user={user} />
      <UserTabs userId={user.id} />
      <div className="mt-4 flex gap-4">
        {children}
        <div className="flex w-80 flex-col gap-6">
          <MediaGallary />
          <Suggests />
        </div>
      </div>
    </main>
  )
}
