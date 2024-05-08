import React from "react";
import LeadllyIcon from "../icons/LeadllyIcon";
import NotificationIcon from "../icons/NotificationIcon";
import Image from "next/image";

import avatar from "/public/assets/images/d4ab00b00e2c1292dc8d8cfaa7144e3d.png";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="h-20 shadow-md flex w-full bg-box justify-between px-10 rounded-[60px] items-center">
      <Link className="h-14 w-10 cursor-pointer" href="/">
        <LeadllyIcon></LeadllyIcon>
      </Link>
      <div className="flex gap-5 items-center">
        <div className="bg-white size-[38px] border-[0.63px] border-[#7D7D7D] rounded-full flex justify-center items-center cursor-pointer">
          <NotificationIcon />
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <div className="size-[38px] rounded-full cursor-pointer">
            <Image
              src={avatar}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full w-full h-full object-cover"
            ></Image>
          </div>
          <p className="text-black text-lg font-medium">Hello, Dhruvi rawal</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
