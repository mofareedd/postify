import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import SiteHeader from "@/components/layouts/site-header"

export default async function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col gap-10">
      <SiteHeader />
      {children}
      {modal}
    </div>
  )
}
