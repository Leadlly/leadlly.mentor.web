import { cn } from "@/lib/utils";
import React from "react";

const RoundArrowIcon = ({ className,stroke }: { className?: string, stroke?:string }) => {
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M4.34003 4.86L1.14001 1.69C1.14001 1.69 1.07004 1.61 1.04004 1.57C1.01004 1.53 1 1.48001 1 1.42001C1 1.30001 1.04005 1.2 1.11005 1.12C1.18005 1.04 1.27 1 1.38 1H8.13C8.24001 1 8.34002 1.04 8.40002 1.12C8.47002 1.2 8.51001 1.3 8.51001 1.41C8.51001 1.44 8.46006 1.53 8.37006 1.69L5.19 4.86C5.13 4.92 5.06004 4.97 4.98004 5.01C4.90004 5.05 4.83 5.07 4.75 5.07C4.67 5.07 4.60002 5.05 4.52002 5.01C4.44002 4.97 4.38002 4.92 4.33002 4.86H4.34003Z"
      fill={stroke}
        stroke={stroke}
      />
    </svg>
  );
};

export default RoundArrowIcon;
