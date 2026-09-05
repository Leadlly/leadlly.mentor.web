"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-2">
      {items.map((item) => {
        // Special highlighting logic
        const isDashboard = item.href === "/teacher" && pathname === "/teacher";
        const isBatches = item.href === "/teacher/batches" && (pathname.startsWith("/teacher/batches") || pathname.startsWith("/teacher/batch"));
        const isClasses = item.href === "/teacher/classes" && (pathname.startsWith("/teacher/classes") || pathname.startsWith("/class"));
        const isAddClasses = item.href === "/teacher/add-classes" && pathname.startsWith("/teacher/add-classes");
        const isStudents = item.href === "/teacher/students" && pathname.startsWith("/teacher/students");
        const isProfile = item.href === "/teacher/profile" && pathname.startsWith("/teacher/profile");

        const isActive = isDashboard || isBatches || isClasses || isAddClasses || isStudents || isProfile;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="text-base"
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default NavMain;
