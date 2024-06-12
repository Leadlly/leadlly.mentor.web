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
export type SidebarLink = {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
};
export interface IIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}
export type TLevelPointProps = {
  cardBgColor: string;
  iconImageSrc: string;
  iconAltText: string;
  iconShadowColor?: string;
  chevronBgColor: string;
  pointsColor: string;
  points: number;
  pointsText: string;
  progressValue?: number;
  progressIndicatorBg?: string;
  pointsProgressText?: string;
  pointsProgressTextColor?: string;
  progressIconStroke?: string;
};
export type TTabNavItemProps = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  className?: string;
  activeTabClassName?: string;
  titleClassName?: string;
  layoutIdPrefix?: string;
};
export type TSemiRadialChartProps = {
  series: number[];
  colors: string[];
  chartLabel: string;
};
export type TTabContentProps = {
  id: string;
  activeTab: string;
  children: React.ReactNode;
};
export interface ChatData {
  studentName:String
  messages: Array<{
    sender: string;
    text: string;
    timestamp: string;
  }>;
}
export type chapterOverviewProps = {
  chapter: string;
  chapterEfficiency: number;
  topics: {
    title: string;
    revisionFrequency: number;
    lastRevised: string;
    efficiency: number;
    revisionDates: {
      dailyEfficiency: number;
      date: string;
    }[];
  }[];
};
export type THeaderProps = {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  titleClassName?: string;
};