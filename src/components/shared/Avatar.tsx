import React from "react";

import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 38, className }) => {
  return (
    <div
      className={`cursor-pointer rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src || "/assets/images/avatar.png"}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
