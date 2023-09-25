import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import OnBoardForm from "@/components/form/onboard-form"

export default async function OnBoard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }

  if (session.user.username) {
    redirect("/")
  }
  return <OnBoardForm />
}
