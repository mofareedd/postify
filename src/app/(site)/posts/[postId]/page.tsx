import React from "react"

import CommentsList from "@/components/comments-list"
import Feed from "@/components/home/feed"
import MediaGallary from "@/components/home/media-gallery"
import ProfileInfo from "@/components/home/profile-info"
import ProfileSide from "@/components/home/profile-side"
import Suggests from "@/components/home/suggests"

export default function page() {
  return (
    <main className="flex min-h-screen flex-row gap-6 px-10 pb-10">
      <div className="flex max-w-[340px] flex-col gap-6">
        <ProfileInfo />
        <Suggests />
      </div>
      <Feed />
      <div className="w-full max-w-sm">
        <CommentsList />
      </div>
    </main>
  )
}
