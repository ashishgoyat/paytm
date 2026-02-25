import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themetoggle";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="p-5">
      <ModeToggle />
    <div className="text-center pt-20 font-extrabold text-7xl">Welcome to Paytm</div>
    <div className="flex justify-center mt-20 space-x-7">
      <Link href={"/login"}>
      <Button size={"lg"} >Login</Button>
      </Link>
      <Link href={"/signup"}>
      <Button size={"lg"}>Sign Up</Button>
      </Link>
    </div>
    </div>
  );
}
