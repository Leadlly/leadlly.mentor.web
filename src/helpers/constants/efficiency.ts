import { EfficiencyOption } from "./../types/index";

export const efficiencyOptions: EfficiencyOption[] = [
  {
    max: 1,
    label: "0%",
    labelClassName: "bg-[#ff6b6b] border-[#ff6b6b]",
    cardBackgroundColor: "bg-[#ff6b6b]",
    textColor: "text-[#FE8C8C]",
  },
  {
    min: 1,
    max: 30,
    label: "1-30%",
    labelClassName: "bg-[#ed9a7b] border-[#ed9a7b]",
    cardBackgroundColor: "bg-[#ed9a7b]",
    textColor: "text-[#FE8C8C]",
  },
  {
    min: 30,
    max: 50,
    label: "30-50%",
    labelClassName: "bg-[#FED18C] border-[#FFDAA2]",
    cardBackgroundColor: "bg-[#FED18C]",
    textColor: "text-[#FFDAA2]",
  },
  {
    min: 50,
    max: 70,
    label: "50-70%",
    labelClassName: "bg-[#FCF4AC] border-[#FFF280]",
    cardBackgroundColor: "bg-[#FCF4AC]",
    textColor: "text-[#FFF280]",
  },
  {
    min: 70,
    label: "70% +",
    labelClassName: "bg-[#E0FAEE] border-[#008F4A]",
    cardBackgroundColor: "bg-[#E0FAEE]",
    textColor: "text-[#008F4A]",
  },
];
function findEfficiencyOption(
  efficiency: number
): EfficiencyOption | undefined {
  if (isNaN(efficiency)) {
    throw new Error("Efficiency must be a number.");
  }

  return efficiencyOptions.find((opt) => {
    if (opt.min !== undefined && opt.max !== undefined) {
      return efficiency >= opt.min && efficiency < opt.max;
    } else if (opt.min !== undefined) {
      return efficiency >= opt.min;
    } else if (opt.max !== undefined) {
      return efficiency < opt.max;
    }
    return false;
  });
}

export function getBackgroundColor(efficiency: number): string {
  const option = findEfficiencyOption(efficiency);
  if (!option) {
    return "bg-[#ffffff]"; 
  }

  return option.cardBackgroundColor;
}

export function getTextColor(efficiency: number): string {
  const option = findEfficiencyOption(efficiency);
  if (!option) {
    return 'text-red-500'
  }

  return option.textColor;
}
