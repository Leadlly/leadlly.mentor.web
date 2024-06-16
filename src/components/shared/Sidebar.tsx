"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { userSidebarLinks } from "@/helpers/constants";

const Sidebar = ({ id }: { id: string }) => {
  const pathname = usePathname();
  return (
    <aside className="md:rounded-xl rounded-l h-full bg-[#ffffff] shadow-custom-inset md:mr-[6%] mr-[15px] px-[4px] max-w-[8rem]">
      <ul className="flex flex-col justify-start items-start h-full no-scrollbar overflow-y-auto pt-5">
        {userSidebarLinks.map((item) => {
          return (
            <Link
              href={`/student/${id}${item.href}`}
              key={item.href}
              className={cn(
                "relative px-4 py-2 rounded-xl md:rounded-full xl:rounded-xl w-full flex items-center justify-start md:justify-center xl:justify-start"
              )}
            >
             
              <li
                className={cn(
                  pathname === `/student/${id}${item.href}`
                    ? "bg-[#9654F4] rounded-full p-4"
                    : "bg-none p-4"
                )}
              >
                <item.icon
                  className={cn('size-5',
                    pathname === `/student/${id}${item.href}`
                      ? item.label !== "Growth Meter"
                        ? " stroke-white"
                        : "fill-white"
                      : item.label !== "Growth Meter"
                        ? "stroke-[#9654F4]"
                        : "fill-[#9654F4]"
                  )}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
