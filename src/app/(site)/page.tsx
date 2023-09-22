import Feed from "@/components/home/feed"
import ProfileSide from "@/components/home/profile-side"
import Suggests from "@/components/home/suggests"
import ModalPost from "@/components/modal-post"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-row gap-6 px-10">
      <ProfileSide />
      <Feed />
      <Suggests />
    </main>
  )
}
