import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import Feed from "@/components/home/feed"
import ProfileCard from "@/components/home/profile-card"
import Suggests from "@/components/home/suggests"

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect("/signin")
  }
  return (
    <main className="flex min-h-screen flex-row gap-6 p-10">
      <ProfileCard />
      <Feed />
      <Suggests />
    </main>
  )
}
