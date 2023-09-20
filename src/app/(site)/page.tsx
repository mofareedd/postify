import ProfileCard from "@/components/home/profile-card";
import { Card, CardBody } from "@nextui-org/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-row p-10 min-h-screen">
      <ProfileCard />
    </main>
  );
}
