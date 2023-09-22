import React from "react"

import MediaGallary from "./media-gallery"
import ProfileInfo from "./profile-info"

export default function ProfileSide() {
  return (
    <div className="flex max-w-[340px] flex-col gap-6">
      <ProfileInfo />
      <MediaGallary />
    </div>
  )
}
