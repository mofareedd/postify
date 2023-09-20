import { OAuthSignIn } from "@/components/form/oauth-signin";
import { Metadata } from "next";
import Link from "next/link";

// import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="lg:p-8 h-screen w-full bg-white text-foreground-50">
      <div className="mx-auto flex w-full flex-col justify-center h-full  space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Choose your preferred sign in method
          </p>
        </div>
        {/* <SignInWithEmail /> */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              {/* Or continue with */}
              Social Login
            </span>
          </div>
        </div>

        <OAuthSignIn />
      </div>
    </div>
  );
}
