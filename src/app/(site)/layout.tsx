import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import SiteHeader from "@/components/layouts/site-header"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) {
    redirect("/signin")
  }
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
