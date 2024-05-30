"use client";
import React from "react";
import LeadllyIcon from "../icons/LeadllyIcon";
import NotificationIcon from "../icons/NotificationIcon";
import Image from "next/image";

import avatar from "/public/assets/images/d4ab00b00e2c1292dc8d8cfaa7144e3d.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/helpers/constants";
import { NavbarLink } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-20 shadow-md flex w-full bg-box justify-between px-10 rounded-[60px] items-center">
      <Link className="h-14 w-10 cursor-pointer" href="/">
        <LeadllyIcon></LeadllyIcon>
      </Link>
      
        <ul className="flex justify-center items-center gap-7">
          {NavbarLinks.map((navbarItem: NavbarLink) => {
            return (
              <Link
              key={navbarItem.label}
                href={navbarItem.href}
                className={cn(
                  "flex gap-5 rounded-lg  ",
                  pathname === navbarItem.href
                    ? "bg-[#9654F4DE] px-2 py-1 "
                    : "text-[#727272] mx-2 my-1"
                )}
              >
                <li className="flex gap-[3px] justify-center items-center">
                  {<navbarItem.icon active={pathname === navbarItem.href} />}

                  <div
                    className={cn(
                      " font-semibold text-xl",
                      pathname === navbarItem.href
                        ? "text-white"
                        : "text-[#727272]"
                    )}
                  >
                    {navbarItem.label}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
     
      <div className="flex gap-5 items-center">
        <div className="bg-white size-[38px] border-[0.63px] border-[#7D7D7D] rounded-full flex justify-center items-center cursor-pointer">
          <NotificationIcon />
        </div>
        <div className="flex justify-center items-center gap-2 ">
         <Avatar size={38} alt="user" />
          <p className="text-black text-lg font-medium">Hello, Dhruvi rawal</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
