import Feed from "@/components/home/feed"
import ProfileCard from "@/components/home/profile-card"
import Suggests from "@/components/home/suggests"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-row gap-6 p-10">
      <ProfileCard />
      <Feed />
      <Suggests />
    </main>
  )
}
