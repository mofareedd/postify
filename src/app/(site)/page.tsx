import SignIn from "@/components/sign-in";
import { Card, CardBody } from "@nextui-org/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-lg">Hello World</h1>
      <Card>
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
      </Card>
      <SignIn />
    </main>
  );
}
