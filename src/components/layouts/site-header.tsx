import { Card } from "@nextui-org/card";
// import React from "react";
import { Icons } from "../icons";
import ProfileDrop from "./profile-drop";

export default function SiteHeader() {
  return (
    <nav className="h-10">
      <Card className="rounded-none py-3 px-8 flex flex-row items-center justify-between">
        <Icons.logo className="w-6 h-6 fill-foreground-700" />
        <ProfileDrop />
      </Card>
    </nav>
  );
}
