
import React, { SVGProps } from "react";

export type TContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export type CheckBoxProps = {
  value: string;
  labelClassName?: string;
};

export type MoodEmoji = {
  moodImg: string;
  mood_id: string;
  mood: string;
};

export type Mood = "sad" | "unhappy" | "neutral" | "smiling" | "laughing";
export type Student = {
  mood?: Mood;
  avatar?: string;
  name: string;
  studentClass: string;
  level: string;
  progress: number;
  messages: number;
  efficiency: number;
  id: string;
};
export interface EfficiencyOption {
  min?: number;
  max?: number;
  label: string;
  labelClassName: string;
  cardBackgroundColor: string;
}
export type NavbarLink = {
  label: string;
  icon: React.ComponentType<{ active?: boolean }>;
  href: string;
};
export interface IIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}