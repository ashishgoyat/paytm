"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/themetoggle"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function SideBar({email}: {email: string | null}) {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    const {error} = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <Sidebar variant={"floating"}>
      <SidebarHeader>
        <div className="flex justify-between">
            <div className="font-semibold text-xl">
                {email}
            </div>
            <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}