"use client";

import React from "react";

import Image from "next/image";

import { LayoutDashboard, Presentation, UserRound, Users } from "lucide-react";

import LogoutButton from "@/components/shared/LogoutButton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavMain from "./nav-main";

const navItems = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Batches",
  //   href: "/teacher/batches",
  //   icon: Presentation,
  // },
  {
    title: "Classes",
    href: "/teacher/classes",
    icon: Presentation,
  },
  {
    title: "Attendance",
    href: "/teacher/students",
    icon: Users,
  },
  {
    title: "Profile",
    href: "/teacher/profile",
    icon: UserRound,
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Image
              src="/assets/images/leadlly_logo.svg"
              alt="Leadlly Logo"
              width={100}
              height={100}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <NavMain items={navItems} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <LogoutButton className="rounded-lg text-sm h-10" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
