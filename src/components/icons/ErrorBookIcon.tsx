import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import React from "react";

export default function ErrorBookIcon({ className, ...props }: IIconProps) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-2", className)}
      {...props}
    >
      <path
        d="M6 1.22681H5.10022C3.8401 1.22681 3.20957 1.22681 2.72827 1.47204C2.30491 1.68776 1.96095 2.03171 1.74524 2.45508C1.5 2.93638 1.5 3.56691 1.5 4.82703V15.627C1.5 16.8871 1.5 17.5169 1.74524 17.9982C1.96095 18.4215 2.30491 18.7661 2.72827 18.9818C3.2091 19.2268 3.83887 19.2268 5.09652 19.2268H6M6 1.22681H15.9002C17.1603 1.22681 17.7895 1.22681 18.2708 1.47204C18.6942 1.68776 19.0393 2.03171 19.255 2.45508C19.5 2.93591 19.5 3.56567 19.5 4.82333V15.6308C19.5 16.8885 19.5 17.5173 19.255 17.9982C19.0393 18.4215 18.6942 18.7661 18.2708 18.9818C17.79 19.2268 17.1611 19.2268 15.9035 19.2268H6M6 1.22681V19.2268M10.5 9.10181H15M10.5 5.72681H15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
