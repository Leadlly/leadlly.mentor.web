import React from "react";
import CheckBox from "./CheckBox";
import { efficiencyOptions } from "@/helpers/constants/efficiency";
import { EfficiencyOption } from "@/helpers/types";

const Efficiency = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h4 className="text-[#7A7A7A] font-medium text-[18px] ">Efficiency</h4>
      <div className="flex w-full ml-[22px] md:ml-0 items-center md:justify-center">
        <ul className="grid grid-cols-2 gap-2">
          {efficiencyOptions.map((option: EfficiencyOption) => (
            <li key={option.label}>
              <div className="flex gap-2 justify-center items-center">
                <CheckBox
                  value={option.label}
                  labelClassName={`text-[#095E6A]  border-[0.7px]   ${option.labelClassName}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Efficiency;
