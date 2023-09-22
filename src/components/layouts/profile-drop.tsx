"use client"

import React from "react"
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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={session!.user?.image ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="max-w-[150px] truncate font-semibold">
            {session!.user?.email}
          </p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">
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
