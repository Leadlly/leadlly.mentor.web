"use client";

import { MotionDiv } from "@/components/shared/MotionDiv";
import { manageAccountTabs } from "@/helpers/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const AccountTabs = ({
  activeManageAccountTab,
}: {
  activeManageAccountTab: string | string[];
}) => {
  return (
    <ul className="flex items-center justify-center lg:justify-normal gap-3 lg:gap-10 overflow-x-auto no-scrollbar">
      {manageAccountTabs.map((tab) => (
        <Link
          key={tab.id}
          href={`/manage-account?tab=${tab.id}`}
          className="relative pb-1"
        >
          {activeManageAccountTab === tab.id && (
            <MotionDiv
              layoutId="active_manage_account_tab"
              transition={{
                type: "spring",
                duration: 0.6,
              }}
              className="absolute rounded h-1 bg-primary inset-x-0 bottom-0"
            />
          )}
          <li
            className={cn(
              "flex items-center justify-between w-full capitalize text-[17px] md:text-2xl font-medium px-3 text-black whitespace-nowrap",
              activeManageAccountTab === tab.id ? "text-primary" : "text-black"
            )}
          >
            {tab.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default AccountTabs;
