import { THeaderProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const Header = ({
  title,
  className,
  icon: Icon,
  titleClassName,
}: THeaderProps) => {
  return (
    <header
      className={cn(
        "md:w-full text-page-title text-[#727272] leading-none font-semibold flex items-center justify-between",
        className
      )}>
      <h2 className={cn(titleClassName)}>{title}</h2>
      {Icon && <div>{Icon}</div>}
    </header>
  );
};

export default Header;
