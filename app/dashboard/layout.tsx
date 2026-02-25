import { SidebarProvider } from "@/components/ui/sidebar"
import { SideBar } from "@/components/dashboard/SideBar"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: {user}} = await supabase.auth.getUser()

  if(!user) {
    redirect("/signin")
  }
  const email = user.email || null;
  return (
    <SidebarProvider style={{"--sidebar-width": "20rem"} as React.CSSProperties}>
      <SideBar email={email} />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}