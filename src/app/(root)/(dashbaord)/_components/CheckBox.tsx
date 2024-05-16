import { CheckBoxProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

const CheckBox = ({ value, labelClassName }: CheckBoxProps) => {
  return (
    <>
      <input type="checkbox" name={value} id={value} />
      <label
        htmlFor={value}
        className={cn(
          " text-blue-700 w-8 h-4 text-[7.7px] flex justify-center items-center border-[0.6px] border-[#464646] rounded-[4px]",
          labelClassName
        )}
      >
        {value}
      </label>
    </>
  );
};

export default CheckBox;
