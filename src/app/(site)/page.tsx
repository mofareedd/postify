import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import Feed from "@/components/home/feed"
import ProfileSide from "@/components/home/profile-side"
import Suggests from "@/components/home/suggests"
import ModalPost from "@/components/modal-post"
import { getAllPosts } from "@/app/_actions/posts"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) return null
  const posts = await getAllPosts(session?.user.id ?? null)

  return (
    <main className="flex min-h-screen flex-row gap-6 px-10 pb-10">
      <ProfileSide />
      <Feed posts={posts} />
      <Suggests />
    </main>
  )
}
