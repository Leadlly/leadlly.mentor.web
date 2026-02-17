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
import { useAppSelector } from "@/redux/hooks";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}) => {
  const { user } = useAppSelector((state) => state.user);

  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href.replace(":teacherId", user?._id!)}
            className="text-base"
          >
            <Link href={item.href.replace(":teacherId", user?._id!)}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMain;
