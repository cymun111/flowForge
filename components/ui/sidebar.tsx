"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}>({ collapsed: false, setCollapsed: () => {} })

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className={cn("flex min-h-screen", className)}>{children}</div>
    </SidebarContext.Provider>
  )
}

export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1 flex flex-col", className)}>{children}</div>
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1 overflow-y-auto", className)}>{children}</div>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("py-2", className)}>{children}</div>
}

export function SidebarGroupContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <nav className={cn("flex flex-col gap-1 px-2", className)}>{children}</nav>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenuButton({
  children,
  asChild,
  isActive,
  className,
  ...props
}: {
  children: React.ReactNode
  asChild?: boolean
  isActive?: boolean
  className?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (asChild) {
    return <>{children}</>
  }
  return (
    <a
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
