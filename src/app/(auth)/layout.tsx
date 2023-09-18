import { Icons } from "@/components/icons";
// import AuthBgPic from "@/../public/auth-bg.jpg";
// import Image from "next/image";
export const metadata = {
  title: "Dashboard",
  description: "E-Commerce Dashboard",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-3 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex col-span-2">
        {/* <Image
          src={AuthBgPic}
          alt="auth-bg"
          className="w-full h-full absolute left-0 top-0"
        /> */}
        <div className="absolute left-0 top-0 w-full h-full bg-black/40"></div>
        {/* <div className="absolute inset-0 bg-slate-900" /> */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-6 w-6 dark:fill-foreground fill-background" />
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
  );
}
