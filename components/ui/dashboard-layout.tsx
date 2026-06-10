"use client";

import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Header } from "@/components/ui/header";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Sidebar>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className={cn("flex flex-1 flex-col p-4 md:p-6")}>
          {children}
        </main>
      </SidebarInset>
    </Sidebar>
  );
}