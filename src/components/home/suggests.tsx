"use client"

import React from "react"
import { Card } from "@nextui-org/react"

import FriendCard from "../friend-card"

const users = [
  {
    name: "John Doe",
    title: "Software Engineer",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "Jane Smith",
    title: "Graphic Designer",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "Michael Johnson",
    title: "Marketing Manager",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "Emily Brown",
    title: "Financial Analyst",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "David Wilson",
    title: "HR Manager",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    name: "Sarah Thompson",
    title: "Product Manager",
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
]
export default function Suggests() {
  return (
    <div className="">
      <Card className="mb-6 w-80 p-4">
        <h1>right</h1>
      </Card>

      <Card className="flex gap-6 p-4">
        {users.map((user) => (
          <FriendCard key={user.name} {...user} />
        ))}
      </Card>
    </div>
  )
}
