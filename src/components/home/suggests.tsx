"use client"

import React from "react"
import Link from "next/link"
import { UserType } from "@/db/schema"
import { UserEmailOmitType } from "@/types"
import { Card, User } from "@nextui-org/react"
import { useSession } from "next-auth/react"

import FollowsBtn from "../follows-btn"

export default function Suggests({ users }: { users: UserEmailOmitType[] }) {
  const { data: session } = useSession()
  return (
    <div className="hidden w-80 md:block">
      <Card className="flex gap-6 p-4">
        {users && users.length
          ? users.map((user) => {
              if (session?.user.id === user.id) return null
              return (
                <div
                  key={user.id}
                  className="flex flex-row items-center justify-between"
                >
                  <Link href={`/${user.id}`}>
                    <User
                      name={user.name}
                      description={"@" + user?.username}
                      avatarProps={{
                        src: user.image ?? "",
                      }}
                    />
                  </Link>
                  <FollowsBtn user={user} />
                </div>
              )
            })
          : null}
      </Card>
    </div>
  )
}
