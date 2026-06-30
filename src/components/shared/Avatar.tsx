import React from "react";

import Image from "next/image";

import { UserIcon } from "lucide-react";

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
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
