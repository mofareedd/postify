"use client"

import { useState, useTransition } from "react"
import { Button } from "@nextui-org/button"
import { AuthOptions, NextAuthOptions } from "next-auth"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", icon: "google", strategy: "google" },
  { name: "Github", icon: "gitHub", strategy: "github" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: NextAuthOptions["providers"][number]["id"]
}[]

export function OAuthSignIn() {
  // const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<string | null>(null)

  async function handleSignIn(strategy: string) {
    setIsLoading(strategy)
    // startTransition(async()=>{/
    try {
      await signIn(strategy)

      toast.success("Signed in successfully!")
    } catch (err: any) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
    setTimeout(() => setIsLoading(null), 4000)

    // })
  }
  return (
    <div className="w-full space-y-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]
        return (
          <div key={provider.name} className="w-full">
            <Button
              aria-label={`Sign in with ${provider.name}`}
              key={provider.name}
              variant="shadow"
              className="w-full"
              isLoading={isLoading === provider.strategy}
              onClick={() => handleSignIn(provider.strategy)}
            >
              {isLoading !== provider.strategy ? (
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              ) : null}

              {provider.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
