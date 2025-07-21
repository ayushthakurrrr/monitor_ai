"use client"

import {
  BotMessageSquare,
  LayoutDashboard,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/influencers",
      label: "Influencers",
      icon: Users,
    },
    {
      href: "/chatbot",
      label: "AI Chatbot",
      icon: BotMessageSquare,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary"><rect width="256" height="256" fill="none"></rect><path d="M128,24a104,104,0,1,0,104,104A104.2,104.2,0,0,0,128,24Z" opacity="0.2"></path><path d="M128,24a104,104,0,1,0,104,104A104.2,104.2,0,0,0,128,24Zm-4.1,185.9a8,8,0,1,1,8.2-14.2,52,52,0,0,0,41.8-49.7,8,8,0,0,1,15.9,1.8,68,68,0,0,1-55.8,65.8,8,8,0,0,1-10.1-3.7ZM56.4,144a68.2,68.2,0,0,1,92.5-62.1,8,8,0,0,1-6.4,14.6,52,52,0,0,0-70.6,47.8,8,8,0,1,1-15.5,4.7Z" fill="currentColor"></path></svg>
            <h1 className="text-xl font-semibold font-headline text-primary group-data-[collapsible=icon]:hidden">
                TrendWatch AI
            </h1>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref>
              <SidebarMenuButton
                as="a"
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  )
}
