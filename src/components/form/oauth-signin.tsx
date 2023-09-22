"use client"

import { useState, useTransition } from "react"
import { Button } from "@nextui-org/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { authOptions } from "@/lib/auth-options"
import { Icons } from "@/components/icons"

// const oauthProviders = [
//   { name: "Google", icon: "google" , strategy:''},
//   { name: "Github", icon: "gitHub" },
// ] satisfies {
//   name: string;
//   icon: keyof typeof Icons;
//   strategy: Adapter;
// }[];

export function OAuthSignIn() {
  // const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(strategy: string) {
    setIsLoading(true)
    // startTransition(async()=>{/
    try {
      await signIn(strategy)
    } catch (err: any) {
      console.log(err)
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
    setTimeout(() => setIsLoading(false), 4000)

    // })
  }
  return (
    <div className="w-full space-y-4">
      {Object.values(authOptions.providers).map((provider) => {
        return (
          <div key={provider.name} className="w-full">
            <Button
              aria-label={`Sign in with ${provider.name}`}
              key={provider.name}
              variant="shadow"
              className="w-full"
              isLoading={isLoading}
              onClick={() => handleSignIn(provider.id)}
            >
              {provider.id === "github" && !isLoading ? (
                <Icons.gitHub className="mr-2 h-4 w-4" aria-hidden="true" />
              ) : null}
              {provider.id === "google" ? (
                <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
              ) : null}
              {provider.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
