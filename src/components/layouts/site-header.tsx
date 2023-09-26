import Link from "next/link"
import { Card } from "@nextui-org/card"

// import React from "react";
import { Icons } from "../icons"
import ProfileDrop from "./profile-drop"

export default function SiteHeader() {
  return (
    <nav className="h-10">
      <Card className="flex flex-row items-center justify-between rounded-none px-8 py-3">
        <Link href={"/"}>
          <Icons.logo className="h-6 w-6 fill-foreground-700" />
        </Link>
        <ProfileDrop />
      </Card>
    </nav>
  )
}
