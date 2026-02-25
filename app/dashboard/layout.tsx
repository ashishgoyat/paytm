import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/components/dashboard/SideBar"
import { headers } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const headerlist = await headers();
  const email = headerlist.get("user-email");
  return (
    <SidebarProvider style={{"--sidebar-width": "20rem"} as React.CSSProperties}>
      <SideBar email={email} />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}