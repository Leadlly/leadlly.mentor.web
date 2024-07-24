"use client";
import React from "react";
import LeadllyIcon from "../icons/LeadllyIcon";
import SmallIcon from "../icons/respoLogo.svg"
import NotificationIcon from "../icons/NotificationIcon";
import dashboardsmall from "../icons/Dashboardsmall.svg"
import communitysmall from "../icons/Comunitysmall.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/helpers/constants";
import { NavbarLink,NavbarLinksmall } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user);
  const pathname = usePathname();
  return (
    <div className="w-full">
      <nav className="h-20 shadow-md hidden lg:flex w-full bg-box justify-between px-10 rounded-[60px] items-center">
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
                  "flex gap-5 rounded-[6px]  ",
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
        <Link href={"/manage-account"} className="flex justify-center items-center gap-2 ">
         <Avatar src={user?.avatar?.url}
            alt={`${user?.firstName}'s profile`}/>
          <p className="text-black text-lg font-medium">Hello, {user?.firstName}{" "}
          {user?.lastName}</p>
        </Link>
      </div>
    </nav>

    <nav className="h-16 shadow-md lg:hidden flex w-full bg-[#E9DBFD] md:rounded-[60px] justify-between px-10 items-center">
      <Link className="cursor-pointer" href="/">
        <Image src={SmallIcon} width={22} height={22} alt="small"/>
      </Link>
      <div className="flex gap-2 items-center">
      <Link href="/" className={`bg-white size-[38px] md:size-[52px] rounded-full flex justify-center items-center cursor-pointer ${pathname === '/' ? 'border border-[#9654F4] shadow-custom-purple shadow-lg' : ''}"`}>
         <Image src={dashboardsmall} alt="dashboard"/>
        </Link>
        <Link href="/community" className={`bg-white size-[38px] md:size-[52px] rounded-full flex justify-center items-center cursor-pointer ${pathname === '/community' ? 'border border-[#9654F4] shadow-custom-purple shadow-lg' : ''}"`}>
         <Image src={communitysmall} className="md:size-[15px]" alt="comunity"/>
        </Link>
        <div className="bg-white size-[38px] md:size-[52px] rounded-full flex justify-center items-center cursor-pointer">
        <NotificationIcon/>
        </div>
        <div className="flex justify-center size-[38px] md:size-[56px] items-center gap-2 ">
         <Avatar alt="user" />
        </div>
      </div>
    </nav>
    </div>
  
  );
};

export default Navbar;
