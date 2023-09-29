import React from "react"
import { UserType } from "@/db/schema"
import { Button, Card, User } from "@nextui-org/react"
import { toast } from "sonner"

interface IProps {
  user: UserType
}
export default function FriendCard({ user }: IProps) {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <div className="flex flex-row items-center justify-between">
      <User
        name={user.name}
        description={user?.username}
        avatarProps={{
          src: user.image ?? "",
        }}
      />
      <Button
        className={
          isFollowed ? "border-default-200 bg-transparent text-foreground" : ""
        }
        color="primary"
        radius="full"
        size="sm"
        variant={isFollowed ? "bordered" : "solid"}
        onPress={() => {
          setIsFollowed(!isFollowed)
          toast.success("You are now following ")
        }}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </div>
  )
}
