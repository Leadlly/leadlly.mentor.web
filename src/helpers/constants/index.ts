"use client";
import CommunityIcon from "@/components/icons/CommunityIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import ListIcon from "@/components/icons/ListIcon";
import PlannerIcon from "@/components/icons/PlannerIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import StudentDashboardIcon from "@/components/icons/StudentDashBoardIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import WorkshopIcon from "@/components/icons/WorkshopIcon";

import { NavbarLink, SidebarLink } from "../types";

export const NavbarLinks: NavbarLink[] = [
  {
    label: "Mentor Dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  { label: "Community", icon: CommunityIcon, href: "/community" },
];
export const userSidebarLinks: SidebarLink[] = [
  {
    icon: StudentDashboardIcon,
    href: "",
    label: "Dashboard",
  },
  {
    icon: PlannerIcon,
    href: "/planner",
    label: "Planner",
  },
  {
    icon: TrackerIcon,
    href: "/tracker",
    label: "Tracker",
  },
  // {
  //   icon: ErrorBookIcon,
  //   href: "/error-book",
  //   label: "Error Book",
  // },
  // {
  //   icon: GrowthMeterIcon,
  //   href: "/growth-meter",
  //   label: "Growth Meter",
  // },
  // {
  //   icon: WorkshopIcon,
  //   href: "/workshops",
  //   label: "Workshops",
  // },
  {
    icon: QuizIcon,
    href: "/quizzes",
    label: "Quizzes",
  },
];
export const trackerTabs = [
  {
    id: "maths",
    subject: "maths",
  },
  {
    id: "physics",
    subject: "physics",
    href: "/physics",
  },
  {
    id: "chemistry",
    subject: "chemistry",
    href: "/chemistry",
  },
  {
    id: "biology",
    subject: "biology",
    href: "/biology",
  },
];
export const quizzesTabs = [
  {
    id: "unattempted",
    label: "unattempted",
  },
  {
    id: "attempted",
    label: "attempted",
    href: "/attempted",
  },
];
export const profileTabs = [
  {
    id: "personal info",
    label: "personal info",
  },
];

export const manageAccountTabs = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  // {
  //   id: "study-progress",
  //   label: "Study Progress",
  // },
  // {
  //   id: "subject-overview",
  //   label: "Subject Overview",
  // },
  // {
  //   id: "your-mentor",
  //   label: "Your Mentor",
  // },
];

export const calculateProgress = (overallProgress: number) => {
  if (typeof overallProgress !== "number" || isNaN(overallProgress)) {
    return 0; // Default to 0 if the value is invalid
  }
  return Math.min(Math.max(overallProgress / 100, 0), 1);
};
