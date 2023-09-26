"use client"

import { useState } from "react"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import { SettingsIcon } from "lucide-react"
import { useSession } from "next-auth/react"

import UpdateProfile from "../form/update-profile"

export default function ProfileInfo() {
  const { data: session } = useSession()

  return (
    <Card className="h-fit w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={session?.user?.image ?? ""}
            // src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {session!.user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{session?.user?.username}
            </h5>
          </div>
        </div>
        <UpdateProfile session={session} />
      </CardHeader>
      <CardBody className="my-2 px-3 py-0 text-small text-default-400">
        <p>{session?.user?.bio}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">4</p>
          <p className=" text-small text-default-400">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">97.1K</p>
          <p className="text-small text-default-400">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}
