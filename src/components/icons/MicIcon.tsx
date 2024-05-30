import { cn } from "@/lib/utils";

const MicIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
    >
      <rect
        x="9.12134"
        y="3.59229"
        width="5.93873"
        height="10.8877"
        rx="2.96937"
        stroke="#CDAAFF"
        stroke-width="1.97958"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.0192 11.5105C19.0192 15.337 15.9171 18.439 12.0906 18.439C8.26411 18.439 5.16211 15.337 5.16211 11.5105"
        stroke="#CDAAFF"
        stroke-width="1.97958"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0906 18.4377V21.4071"
        stroke="#CDAAFF"
        stroke-width="1.97958"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default MicIcon;
