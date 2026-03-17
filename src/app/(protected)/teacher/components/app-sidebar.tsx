"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CalendarPlus, LayoutDashboard, Presentation, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
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
  {
    title: "Batches",
    href: "/teacher/batches",
    icon: Presentation,
  },
  {
    title: "Classes",
    href: "/teacher/classes",
    icon: Presentation,
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: Users,
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
    </Sidebar>
  );
};

export default AppSidebar;
