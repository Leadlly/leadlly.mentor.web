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
  messages: string;
  efficiency: number;
  id: string;
};

export type TTrackerProps = {
  _id: string;
  user: string;
  subject: string;
  chapter: Chapter;
  topics: Topic[];
};
export type Chapter = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type Topic = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
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
  className?:string
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

export interface monthlyReport {
  startDate: string;
  endDate: string;
  days: {
      day: string;
      date: string;
      session: any;
      quiz: any;
      overall: any;
  }[];
}

export interface  overallReport {
  day: string;
  date: string;
  session: number;
  quiz: number;
  overall: number;
}[]
export interface weeklyReport {
  startDate: string;
  endDate: string;
  days: {
      day: string;
      date: string;
      session: any;
      quiz: any;
      overall: any;
  }[];
}
interface Streak {
  number: number | null;
}

interface Level {
  number: number
}

interface Points {
  number: number
}

interface DailyReport {
  mood: any[]; 
}

interface Report {
  dailyReport: DailyReport;
}
export interface Studentinformation {
  firstname: string;
  lastname: string;
  email: string;
  phone: {
    personal: string
    other: string 
  };
  parent: {
    name: string 
    phone: string 
  };
  mentor: {
    id: string;
  };
  planner: boolean;
  address: {
    country: string
    addressLine: string
    pincode: string
  };
  academic: {
    standard: number;
    competitiveExam: string;
    schedule: string;
    coachingMode: string;
    coachingName: string 
    coachingAddress: string 
    schoolOrCollegeName: string 
    schoolOrCollegeAddress: string 
    subjects: {
      name: string;
      overall_efficiency: number;
      overall_progress: number;
      total_questions_solved: number;
    }[];
  };
  about: {
    dateOfBirth: string 
    gender: string;
  };
  avatar: {
    public_id: string 
    url: string 
  };
  details: {
    level: Level;
    points: Points;
    streak: Streak;
    mood: {
      day: string;
      emoji: string;
    }[];
    report: {
      dailyReport: {
        session: number,
        quiz: number,
        overall: number
      }
    }
  };
  subscription: {
    id: string 
    status: string 
    dateOfActivation: string 
  };
  freeTrial: {
    availed: boolean;
    active: boolean;
    dateOfActivation: string;
    dateOfDeactivation: string 
  };
  refund: {
    status: string 
    amount: number 
  };
  createdAt: string;
  updatedAt: string;
}

export type InfoCardProps = {
  sections: InfoBoxProps[];
}
export interface ISubject {
  name: string;
  overall_efficiency: number;
  overall_progress: number;
  total_questions_solved: number;
}
export interface IAcademic {
  standard: number;
  competitiveExam?: string | null;
  subjects?: ISubject[];
  schedule?: string | null;
  coachingMode?: string | null;
  coachingName?: string | null;
  coachingAddress?: string | null;
  schoolOrCollegeName?: string | null;
  schoolOrCollegeAddress?: string | null;
}

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

// Mentor Info types
interface IAvatar {
  public_id: string;
  url: string;
}

interface IAbout {
  dateOfBirth: string | null;
  gender: string | null;
}

interface IAddress {
  country: string | null;
  addressLine: string | null;
  pincode: number | null;
}

interface IPhone {
  personal: number | null;
  other: number | null;
}

interface IStudent {
  id: string;
  gmeet: IGMeet;
}

export interface MentorPersonalInfoProps  {
  firstname: string | null;
  lastname: string | null;
  email: string;
  phone: IPhone;
  password?: string | null;
  salt?: string | null;
  address: IAddress;
  avatar: IAvatar;
  about: IAbout;
  academic: {
    schoolOrCollegeName: string | null;
    schoolOrCollegeAddress: string | null;
    degree: string | null;
  };
  status: 'Verified' | 'Not Verified';
  gmeet: {
    tokens: Record<string, any>;
    link: string | null;
  };
  preference: {
    standard: string[];
    competitiveExam: string[];
  };
  students: IStudent[];
  createdAt: Date;
  resetPasswordToken?: string | null;
  resetTokenExpiry?: Date | null;

  comparePassword(candidatePassword: string): Promise<boolean>;
  getToken(): Promise<string>;
}
