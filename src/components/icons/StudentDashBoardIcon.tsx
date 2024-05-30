import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const StudentDashboardIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-2", className)}
      {...props}
    >
      <rect
        x="1"
        y="1"
        width="6.17647"
        height="6.17647"
        rx="2.5"
        stroke-width="2"
      />
      <rect
        x="1"
        y="9.82324"
        width="6.17647"
        height="6.17647"
        rx="2.5"
        stroke-width="2"
      />
      <rect
        x="9.82373"
        y="1"
        width="6.17647"
        height="6.17647"
        rx="2.5"
        stroke-width="2"
      />
      <rect
        x="9.82373"
        y="9.82324"
        width="6.17647"
        height="6.17647"
        rx="2.5"
        stroke-width="2"
      />
    </svg>
  );
};

export default StudentDashboardIcon;
