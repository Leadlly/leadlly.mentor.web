import { cn } from "@/lib/utils";

const Progressbar = ({

  value,
  indicatorClassName,
  progressClassName,
}: {
  value?: number;
  indicatorClassName?: string;
  progressClassName?: string;
}) => {
  return (
    <div className={cn("rounded h-[6px] w-16  bg-[#C1C1C1]", progressClassName)}>
      <div
        style={{ width: `${value}%` }}
        className={cn(
          "h-full rounded bg-[#0075FF]",
          indicatorClassName
        )}
      ></div>
    </div>
  );
};
export default Progressbar;
