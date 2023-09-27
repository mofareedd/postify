"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardBody, CardHeader, Tab, Tabs } from "@nextui-org/react"

type TabsLinkTypes = "posts" | "media" | "likes"
export default function UserTabs() {
  const [activeTab, setActiveTab] = React.useState<TabsLinkTypes>("posts")
  const router = useRouter()
  let tabs: { id: TabsLinkTypes; label: string }[] = [
    {
      id: "posts",
      label: "Posts",
    },
    {
      id: "likes",
      label: "Likes",
    },
    {
      id: "media",
      label: "Media",
    },
  ]

  function handleTabChange(tab: "posts" | "media" | "likes") {
    router.push(tab)
  }

  useEffect(() => {
    handleTabChange(activeTab)
  }, [activeTab])

  return (
    <div className="mb-4 mt-4 flex w-full flex-col justify-center">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        className="w-full"
        fullWidth
        disabledKeys={["media"]}
        onSelectionChange={(key) => setActiveTab(key as TabsLinkTypes)}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
    </div>
  )
}
