"use client"

import React from "react"
import { Avatar, Button, Card, Textarea } from "@nextui-org/react"
import { CameraIcon, Send } from "lucide-react"

import UploadFile from "../upload-file"

export default function CreatePost() {
  async function createPostHandler() {}
  return (
    <Card className="p-2">
      <div className="flex items-center gap-2">
        <Avatar
          isBordered
          size="sm"
          color="default"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div className="relative flex-1">
          <Textarea
            minRows={1}
            labelPlacement="outside"
            placeholder="What's in your mind..."
          />
          <UploadFile />
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
    </Card>
  )
}
