import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import CreatePost from "@/components/form/create-post"
import Feed from "@/components/home/feed"
import MediaGallary from "@/components/home/media-gallery"
import ProfileInfo from "@/components/home/profile-info"
import Suggests from "@/components/home/suggests"
import ModalPost from "@/components/modal-post"
import PostsList from "@/components/posts-list"
import { getAllPosts, postsCount } from "@/app/_actions/posts"

import { getAllUsers } from "../_actions/user"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) redirect("/signin")
  const posts = await getAllPosts({
    visitorUserId: session?.user.id ?? null,
    limit: 10,
    offset: 0,
  })
  const count = await postsCount()
  const users = await getAllUsers(session?.user.id ?? null)

  return (
    <main className="flex min-h-screen flex-row gap-6 px-10 pb-10">
      {session?.user ? (
        <div className="hidden max-w-[340px] flex-col gap-6 xl:flex">
          <ProfileInfo
            user={{ ...session.user, isFollowed: "0" }}
            isMyProfile
          />
          <MediaGallary />
        </div>
      ) : (
        <div className="w-[340px]" />
      )}
      {/* <Feed posts={posts} /> */}
      <div className="flex flex-1 flex-col gap-4">
        {session?.user ? <CreatePost user={session.user} /> : null}
        <PostsList posts={posts} count={count[0].count} />
      </div>
      <Suggests users={users} />
    </main>
  )
}
