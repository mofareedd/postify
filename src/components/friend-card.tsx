import React from "react"
import { Button, Card, User } from "@nextui-org/react"
import { toast } from "sonner"

interface IProps {
  name: string
  title: string
  src?: string
}
export default function FriendCard(props: IProps) {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <div className="flex flex-row items-center justify-between">
      <User
        name={props.name}
        description={props.title}
        avatarProps={{
          src: props.src ?? "",
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
