"use client"

import React from "react"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PostTypeWithRelations } from "@/db/schema"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react"
import { MoreHorizontal } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import usePostActions from "@/hooks/usePostActions"
import usePostDeletion from "@/hooks/usePostDeletion"

import { Icons } from "./icons"

export default function PostCard({ post }: { post: PostTypeWithRelations }) {
  const [isLiked, setIsLiked] = React.useState<"0" | "1">(post.isLiked ?? "0")
  const { data: session } = useSession()
  const { likeHandler, isLoading } = usePostActions()

  function actionHandler(type: "like" | "bookmark") {
    if (!session?.user.id)
      return toast.error("You need to be logged in to like a post")

    if (type === "like") {
      setIsLiked((prev) => (prev === "0" ? "1" : "0"))
      likeHandler({
        postId: post.id,
        userId: session?.user.id,
        action: post.isLiked,
      })
      return
    }
  }
  return (
    <Card className="min-h-32 h-fit w-full">
      <PostHeader
        post={post}
        currentUserId={session?.user ? session.user.id : null}
      />

      <Divider />

      <CardBody
        className="px-7 text-small"
        as={Link}
        href={`${post.authorId}/posts/${post.id}`}
      >
        <p className="mb-4 mt-2 whitespace-pre-line">{post.content}</p>
        {post.images?.length ? (
          <div className="relative max-h-96 w-full overflow-hidden">
            {post.images.map((el) => (
              <Image
                as={NextImage}
                key={el.id}
                width={700}
                height={700}
                className="object-contain"
                src={el.url}
                alt=""
              />
            ))}
          </div>
        ) : null}
      </CardBody>
      <CardFooter>
        <div className="flex w-full items-center justify-around">
          <button className="flex items-center gap-3">
            <Icons.chat className="h-4 w-4" />
            <span className="text-xs">
              {post.comments ? post.comments.length : post.commentCount}
            </span>
          </button>
          <button
            disabled={isLoading}
            onClick={() => actionHandler("like")}
            className="group flex items-center gap-3"
          >
            <Icons.like
              className={cn(
                "h-4 w-4",
                isLiked === "1"
                  ? "fill-red-500 text-red-500 group-hover:opacity-80"
                  : ""
              )}
            />
            <span className="text-xs">{post?.likeCount || 0}</span>
          </button>
          <button className="flex items-center gap-3">
            <Icons.bookmark className="h-4 w-4" />
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

function PostHeader({
  post,
  currentUserId,
}: {
  post: PostTypeWithRelations
  currentUserId: string | null
}) {
  const { deletePostHandler, isLoading } = usePostDeletion(post, currentUserId)
  const [isFollowed, setIsFollowed] = React.useState(false)
  const router = useRouter()

  return (
    <CardHeader className="justify-between p-4">
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <User
            as="button"
            name={post.author.name}
            description={`@${post.author.username}`}
            className="transition-transform"
            avatarProps={{
              src: post.author.image ?? "",
              name: post.author.name ?? "",
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <Card
            shadow="none"
            className="max-w-[300px] border-none bg-transparent"
          >
            <CardHeader className="justify-between">
              <div
                // onClick={() => router.push(`/${post.author.username}`)}
                className="flex cursor-pointer gap-3"
              >
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={post.author.image ?? ""}
                  name={post.author.name ?? ""}
                />
                <div
                  onClick={() => router.push(`/${post.author.username}`)}
                  className="flex flex-col items-start justify-center"
                >
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {post.author.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-500">
                    @{post.author.username}
                  </h5>
                </div>
              </div>
              <Button
                color="primary"
                radius="full"
                size="sm"
                // variant={isFollowed ? "bordered" : "solid"}
                onPress={() => router.push(`/${post.author.id}`)}
              >
                Visit
              </Button>
              {/* <Button
                className={
                  isFollowed
                    ? "border-default-200 bg-transparent text-foreground"
                    : ""
                }
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button> */}
            </CardHeader>
            <CardBody className="px-3 py-0">
              <p className="pl-px text-small text-default-500">
                Full-stack developer, @getnextui lover she/her
                <span aria-label="confetti" role="img">
                  🎉
                </span>
              </p>
            </CardBody>
          </Card>
        </PopoverContent>
      </Popover>
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <Button
            isIconOnly
            color="primary"
            variant="faded"
            aria-label="Take a photo"
          >
            <MoreHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          aria-label="Dropdown menu with shortcut"
          disabledKeys={["report", isLoading ? "delete" : ""]}
        >
          <DropdownItem
            key="view"
            shortcut={<Icons.enter className="h-4 w-4" />}
            onClick={() => router.push(`/${post.authorId}/posts/${post.id}`)}
          >
            View post
          </DropdownItem>
          <DropdownItem
            key="copy"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/${post.authorId}/posts/${post.id}` ?? ""
              )
              toast.success("Link copied to clipboard")
            }}
            shortcut={<Icons.copy className="h-4 w-4" />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="report"
            shortcut={<Icons.flag className="h-4 w-4" />}
          >
            Report post
          </DropdownItem>
          <DropdownItem
            key="delete"
            shortcut={
              !isLoading ? (
                <Icons.trash className="h-4 w-4" />
              ) : (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              )
            }
            className={cn(
              "text-danger",
              post.authorId !== currentUserId ? "hidden" : "flex"
            )}
            onClick={deletePostHandler}
            color="danger"
          >
            Delete Post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </CardHeader>
  )
}
