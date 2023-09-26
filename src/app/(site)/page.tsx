import Feed from "@/components/home/feed"
import ProfileSide from "@/components/home/profile-side"
import Suggests from "@/components/home/suggests"
import ModalPost from "@/components/modal-post"

import { getAllPosts } from "../_actions/posts"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="flex min-h-screen flex-row gap-6 px-10">
      <ProfileSide />
      <Feed posts={posts} />
      <Suggests />
    </main>
  )
}
