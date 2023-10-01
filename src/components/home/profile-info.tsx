"use client"

import { UserType } from "@/db/schema"
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react"
import { Session } from "next-auth"

import UpdateProfile from "../form/update-profile"

export default function ProfileInfo({
  user,
  isMyProfile = false,
}: {
  user: UserType
  isMyProfile?: boolean
}) {
  return (
    <Card className="h-fit w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={user?.image ?? ""}
            name={user?.name ?? ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{user?.username}
            </h5>
          </div>
        </div>
        {isMyProfile ? <UpdateProfile user={user} /> : null}
      </CardHeader>
      <CardBody className="my-2 px-3 py-0 text-small text-default-400">
        <p>{user?.bio}</p>
      </CardBody>
    </Card>
  )
}
