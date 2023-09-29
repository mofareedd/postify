"use client"

import React from "react"
import { UserType } from "@/db/schema"
import { Card } from "@nextui-org/react"
import { useSession } from "next-auth/react"

import FriendCard from "../friend-card"

export default function Suggests({ users }: { users: UserType[] }) {
  const { data: session } = useSession()
  return (
    <div className="w-80">
      <Card className="flex gap-6 p-4">
        {users && users.length
          ? users.map((user) => {
              if (session?.user.id === user.id) return null
              return <FriendCard key={user.id} user={user} />
            })
          : null}
      </Card>
    </div>
  )
}
