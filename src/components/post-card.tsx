"use client"

import React from "react"
import NextImage from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PostTypeWithRelations } from "@/db/schema"
import { UploadedFile } from "@/types"
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
  Modal,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  User,
} from "@nextui-org/react"
import { MoreHorizontal } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import usePostActions from "@/hooks/usePostActions"
import usePostDeletion from "@/hooks/usePostDeletion"

import FollowsBtn from "./follows-btn"
import { Icons } from "./icons"

export default function PostCard({ post }: { post: PostTypeWithRelations }) {
  // prettier-ignore
  // @ts-ignore
  const initialLike = post.isLiked?.toString() === "1" || post.isLiked === true ? "1" : "0"
  const [isLiked, setIsLiked] = React.useState<"0" | "1">(initialLike)
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

      <CardBody className="px-7 text-small">
        <Link href={`/${post.authorId}/posts/${post.id}`}>
          <p className="mb-4 mt-2 whitespace-pre-line">{post.content}</p>
        </Link>
        {post.images?.length ? (
          <PostImageModal postImage={post.images[0]} />
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
          <button disabled className="flex items-center gap-3">
            <Icons.bookmark className="h-4 w-4 text-gray-500" />
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
            className="w-full min-w-[300px] max-w-xs  border-none bg-transparent"
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
                  onClick={() => router.push(`/${post.author.id}`)}
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

              {post.authorId !== currentUserId ? (
                <FollowsBtn
                  user={{
                    ...post.author,
                    isFollowed: post.author.isFollowed ? "1" : "0",
                  }}
                />
              ) : null}
            </CardHeader>
            <CardBody className="px-3 py-0">
              <p className="line-clamp-3 pl-px text-small text-default-500">
                {post.author?.bio}
              </p>
            </CardBody>
          </Card>
        </PopoverContent>
      </Popover>
      <Dropdown>
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

function PostImageModal({ postImage }: { postImage: UploadedFile }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="">
      <div
        onClick={onOpen}
        className="relative max-h-96 w-full overflow-hidden"
      >
        <Image
          as={NextImage}
          width={700}
          height={700}
          className="object-contain"
          src={postImage.url}
          alt=""
        />
      </div>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-red-50">
          <Image
            as={NextImage}
            width={1024}
            height={1024}
            className="object-contain"
            src={postImage.url}
            alt=""
          />
        </ModalContent>
      </Modal>
    </div>
  )
}
