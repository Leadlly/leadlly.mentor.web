import Image from "next/image";
import React from "react";

import avatar from "/public/assets/images/d4ab00b00e2c1292dc8d8cfaa7144e3d.png";
interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 38 }) => {
  return (
    <div
      className="cursor-pointer rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={src || avatar}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
