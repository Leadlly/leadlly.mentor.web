import { cn } from "@/lib/utils";

const MeetingIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
    >
      <path
        d="M20.25 1H1.75C1.19772 1 0.75 1.44772 0.75 2V18C0.75 18.5523 1.19772 19 1.75 19H20.25C20.8023 19 21.25 18.5523 21.25 18V2C21.25 1.44772 20.8023 1 20.25 1Z"
        
      />
      <path
        d="M24.25 11.9854V8.48604C24.25 8.17917 24.3909 7.8893 24.6322 7.69972L29.6322 3.77115C30.2883 3.25562 31.25 3.72303 31.25 4.55746V15.5568C31.25 16.3702 30.3306 16.8433 29.6688 16.3705L24.6688 12.7991C24.406 12.6114 24.25 12.3083 24.25 11.9854Z"
      
      />
    </svg>
  );
};

export default MeetingIcon;
