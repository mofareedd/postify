"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"

import ModeToggle from "./mode-toggle"

export default function ProfileDrop() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={session?.user?.image ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={["analytics", "mode", "help", "settings"]}
        closeOnSelect={false}
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="max-w-[150px] truncate font-semibold">
            {session?.user.name}
          </p>
        </DropdownItem>
        <DropdownItem
          key="profile"
          onClick={() => router.push(`${session?.user.id}`)}
        >
          Profile
        </DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="settings">Settinga</DropdownItem>
        <DropdownItem key="help">Help & Support</DropdownItem>
        <DropdownItem key="mode">
          <ModeToggle />
        </DropdownItem>
        <DropdownItem
          onClick={() => signOut({ callbackUrl: "/signin" })}
          key="logout"
          color="danger"
          className="text-danger-500"
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
