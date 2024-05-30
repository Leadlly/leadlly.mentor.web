import { cn } from "@/lib/utils";

const ChatIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", className)}
    >
      <path
        d="M13.5 26.5C20.4036 26.5 26 20.9036 26 14C26 7.09644 20.4036 1.5 13.5 1.5C6.59644 1.5 1 7.09644 1 14C1 16.0662 1.50129 18.0152 2.38889 19.7322L1 26.5L7.76777 25.1111C9.48477 25.9987 11.4338 26.5 13.5 26.5Z"
        
        stroke-opacity="0.94"
        stroke-width="1.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
