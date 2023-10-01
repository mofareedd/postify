import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import Feed from "@/components/home/feed"
import MediaGallary from "@/components/home/media-gallery"
import ProfileInfo from "@/components/home/profile-info"
import Suggests from "@/components/home/suggests"
import ModalPost from "@/components/modal-post"
import { getAllPosts } from "@/app/_actions/posts"

import { getAllUsers } from "../_actions/user"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) redirect("/signin")
  const posts = await getAllPosts(session?.user.id ?? null)
  const users = await getAllUsers(session?.user.id ?? null)

  return (
    <main className="flex min-h-screen flex-row gap-6 px-10 pb-10">
      {session?.user ? (
        <div className="flex max-w-[340px] flex-col gap-6">
          <ProfileInfo user={session.user} isMyProfile />
          <MediaGallary />
        </div>
      ) : (
        <div className="w-[340px]" />
      )}
      <Feed posts={posts} />
      <Suggests users={users} />
    </main>
  )
}
