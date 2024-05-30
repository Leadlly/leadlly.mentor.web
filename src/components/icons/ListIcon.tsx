
import { IIconProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const ListIcon = ({ className, ...props }: IIconProps) => {
  return (
    <svg
      width="23"
      height="12"
      viewBox="0 0 23 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5 fill-none stroke-2", className)}
      {...props}
    >
      <path
        d="M1 1H22"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M1 6H22"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M1 11H22"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ListIcon;
