import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { Icons } from "@/components/icons"

// import AuthBgPic from "@/../public/auth-bg.jpg";
// import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }
  return (
    <div className="relative min-h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-3 lg:px-0">
      <div className="bg-muted relative col-span-2 hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        {/* <Image
          src={AuthBgPic}
          alt="auth-bg"
          className="w-full h-full absolute left-0 top-0"
        /> */}
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        {/* <div className="absolute inset-0 bg-slate-900" /> */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-6 w-6 fill-background dark:fill-foreground" />
          <span className="pt-1">Postify</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo; Share your fleeting moments with the world through
              Postify! Discover new users, trending posts, and exciting content
              tailored to your interests..&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  )
}
