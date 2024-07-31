"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { userSidebarLinks } from "@/helpers/constants";
import ListIcon from "../icons/ListIcon";
import Popup from "@/app/(root)/student/[studentId]/components/ListComponent";

const Sidebar = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleListClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsPopupOpen(!isPopupOpen); // Toggle popup
  };

  const handleTabClick = () => {
    setIsPopupOpen(false); // Close popup when a tab is clicked
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close popup
  };

  return (
    <>
      <aside className="md:rounded-xl rounded-l h-full bg-[#ffffff] shadow-custom-inset md:mr-[6%] mr-[15px] px-[4px] max-w-[8rem]">
        <ul className="flex flex-col justify-start items-start h-full no-scrollbar overflow-y-auto pt-5">
          <div className="relative px-4 py-2 rounded-xl md:rounded-full xl:rounded-xl w-full flex items-center justify-start md:justify-center xl:justify-start bg-white shadow-custom-inset">
            <Link href="#" onClick={handleListClick}>
              <li className={cn(
                isPopupOpen ? "bg-[#9654F4] rounded-full p-4" : "bg-none p-4"
              )}>
                <ListIcon className={cn(
                  'size-5',
                  isPopupOpen ? "stroke-white" : "stroke-[#9654F4]"
                )} />
              </li>
            </Link>
          </div>
          {userSidebarLinks.map((item) => (
            <Link
              href={`/student/${id}${item.href}`}
              key={item.href}
              className={cn(
                "relative px-4 py-2 rounded-xl md:rounded-full xl:rounded-xl w-full flex items-center justify-start md:justify-center xl:justify-start"
              )}
              onClick={handleTabClick}
            >
              <li
                className={cn(
                  isPopupOpen
                    ? "bg-none p-4" // Inactive styling when popup is open
                    : pathname === `/student/${id}${item.href}`
                      ? "bg-[#9654F4] rounded-full p-4" // Active styling for current route
                      : "bg-none p-4" // Default inactive styling
                )}
              >
                <item.icon
                  className={cn('size-5',
                    isPopupOpen
                      ? "stroke-[#9654F4]" // Inactive styling for icon when popup is open
                      : pathname === `/student/${id}${item.href}`
                        ? item.label !== "Growth Meter"
                          ? "stroke-white"
                          : "fill-white" // Active icon styling for current route
                        : item.label !== "Growth Meter"
                          ? "stroke-[#9654F4]"
                          : "fill-[#9654F4]" // Default icon styling
                  )}
                />
              </li>
            </Link>
          ))}
        </ul>
      </aside>
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </>
  );
};

export default Sidebar;
