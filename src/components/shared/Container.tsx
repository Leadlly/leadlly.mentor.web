import clsx from "clsx";
import { TContainerProps } from "@/helpers/types";

const Container = ({ children, className }: TContainerProps) => {
  return (
    <div className={clsx("max-w-7xl w-full mx-auto md:px-6 px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
