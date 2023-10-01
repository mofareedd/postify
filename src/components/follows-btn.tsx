import React from "react"
import { UserType } from "@/db/schema"
import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import useFollow from "@/hooks/useFollow"

interface IProps {
  user: UserType
}
export default function FollowsBtn({ user }: IProps) {
  const [isFollowed, setIsFollowed] = React.useState(
    user?.isFollowed === "1" ? true : false
  )
  const { isLoading, followHandler } = useFollow()
  const { data: session } = useSession()

  async function onFollow() {
    if (!session?.user) {
      return toast.error("You must be logged in to follow a friend")
    }

    setIsFollowed(!isFollowed)
    await followHandler({
      userId: session.user.id,
      followingId: user.id,
      name: user.name,
      newFollow: user.isFollowed === "0" ? true : false,
    })
  }
  return (
    <Button
      isDisabled={isLoading}
      color={isFollowed ? "danger" : "primary"}
      radius="full"
      size="sm"
      variant={isFollowed ? "bordered" : "solid"}
      onPress={onFollow}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  )
}
