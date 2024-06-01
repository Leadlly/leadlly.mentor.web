import { cn } from "@/lib/utils";

const AttachIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="13"
      height="21"
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.2129 7.44577L11.2129 13.5542C11.2129 16.9278 8.93387 19.6626 6.12255 19.6626C3.31123 19.6626 1.0322 16.9278 1.0322 13.5542L1.0322 5.40964C1.0322 3.16058 2.55155 1.33736 4.42577 1.33736C6.29998 1.33736 7.81933 3.16058 7.81933 5.40964L7.81933 13.5542C7.81933 14.6787 7.05965 15.5903 6.12255 15.5903C5.18544 15.5903 4.42577 14.6787 4.42577 13.5542L4.42577 5.40964"
        stroke="#CDAAFF"
        strokeWidth="2.03614"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AttachIcon;
