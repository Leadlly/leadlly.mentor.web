import React from "react";

interface ChevronRightIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  width = 12,
  height = 12,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 3 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.2874 2.96436L2.58325 1.68846L1.2874 0.412571"
        stroke="#989898"
        strokeWidth="0.637946"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;
