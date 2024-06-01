import { cn } from "@/lib/utils";

const SendIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
    >
      <path
        d="M4.69457 1.43116L13.9715 7.13723C15.3597 7.99112 15.3597 10.0089 13.9715 10.8628L4.69458 16.5689C3.16529 17.5095 1.21673 16.3085 1.3698 14.5196L1.84211 9.00002L1.3698 3.48041C1.21673 1.69154 3.16529 0.490526 4.69457 1.43116Z"
        fill="white"
      />
      <path
        d="M1.84211 9.00002L1.3698 3.48041C1.21673 1.69154 3.16529 0.490526 4.69457 1.43116L13.9715 7.13723C15.3597 7.99112 15.3597 10.0089 13.9715 10.8628L4.69458 16.5689C3.16529 17.5095 1.21673 16.3085 1.3698 14.5196L1.84211 9.00002ZM1.84211 9.00002H5.70417"
        stroke="#9654F4"
        strokeWidth="2.18696"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
