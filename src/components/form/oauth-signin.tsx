"use client";

import * as React from "react";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";

const oauthProviders = [
  { name: "Google", icon: "google" },
  { name: "Github", icon: "gitHub" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  // strategy: OAuthStrategy;
}[];

export function OAuthSignIn() {
  return (
    <div className="w-full space-y-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];

        return (
          <div key={provider.name} className="w-full">
            <Button
              aria-label={`Sign in with ${provider.name}`}
              key={provider.name}
              variant="shadow"
              className="w-full"
              onClick={() => console.log("first")}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              {provider.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
