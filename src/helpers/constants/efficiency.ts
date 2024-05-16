import { EfficiencyOption } from "./../types/index";

export const efficiencyOptions: EfficiencyOption[] = [
  {
    max: 30,
    label: ">> 30%",
    labelClassName: "bg-[#FF8A83] border-[#FC0F00]",
    cardBackgroundColor: "bg-[#FF8A83]",
  },
  {
    min: 0,
    max: 30,
    label: "0-30%",
    labelClassName: "bg-[#FFC2C2] border-[#FE8C8C]",
    cardBackgroundColor: "bg-[#FFC2C2]",
  },
  {
    min: 30,
    max: 50,
    label: "30-50%",
    labelClassName: "bg-[#FED18C] border-[#FFDAA2]",
    cardBackgroundColor: "bg-[#FED18C]",
  },
  {
    min: 50,
    max: 70,
    label: "50-70%",
    labelClassName: "bg-[#FCF4AC] border-[#FFF280]",
    cardBackgroundColor: "bg-[#FCF4AC]",
  },
  {
    min: 70,
    label: "70% +",
    labelClassName: "bg-[#E0FAEE] border-[#008F4A]",
    cardBackgroundColor: "bg-[#E0FAEE]",
  },
];

export function getBackgroundColor(efficiency: number): string {
  if (isNaN(efficiency)) {
    throw new Error("Efficiency must be a number.");
  }

  const option = efficiencyOptions.find((opt) => {
    if (opt.min !== undefined && opt.max !== undefined) {
      return efficiency >= opt.min && efficiency < opt.max;
    } else if (opt.min !== undefined) {
      return efficiency >= opt.min;
    } else if (opt.max !== undefined) {
      return efficiency < opt.max;
    }
    return false;
  });

  if (!option) {
    throw new Error("Invalid efficiency value.");
  }

  return option.cardBackgroundColor;
}
