import React, { SVGProps } from "react";

// Define the IGMeet interface
export interface IGMeet {
  meetingId: string;
  meetingUrl: string;
}

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
  textColor:string
}
export type NavbarLink = {
  label: string;
  icon: React.ComponentType<{ active?: boolean }>;
  href: string;
};
export type NavbarLinksmall = {
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
export type Params = {
  params: {
    studentId: string;
  };
};
export type InfoItem = {
  label: string;
  value: string;
}

export type InfoBoxProps = {
  title: string;
  items: InfoItem[];
}

export type InfoCardProps = {
  sections: InfoBoxProps[];
}

export type UserDataProps = {
  firstname: string;
  lastname?: string;
  email: string;
  phone?: {
    personal?: number;
    other?: number;
  };
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  about?: {
    college?: string;
    degree?: string;
    dob?: string; 
  };
  status: "Verified" | "Not Verified";
  students?: string;
  createdAt?: Date; 
  resetPasswordToken?: string | null;
  resetTokenExpiry?: string | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getToken(): Promise<string>;
};

export type UserProps = {
  user: UserDataProps | null;
};

export type OTPProps = {
  otp: string;
};

export type SignUpDataProps = {
  name: string;
  email: string;
  password: string;
};

export type SignInDataProps = {
  email: string;
  password: string;
};

export type ForgotPasswordProps = {
  email: string;
};

export type ResetPasswordProps = {
  password: string;
};