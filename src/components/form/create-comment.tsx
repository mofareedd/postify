"use client"

import React from "react"
import { Avatar, Button, Textarea } from "@nextui-org/react"
import { Send } from "lucide-react"

export default function CreateComment() {
  return (
    <div className="mb-2 flex items-center gap-3 border-b border-default-100 p-6 py-2">
      <Avatar
        isBordered
        size="sm"
        color="default"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <div className="flex-1">
        <Textarea
          minRows={2}
          labelPlacement="outside"
          placeholder="Write your comment here..."
        />
      </div>
      <Button
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="Take a photo"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
