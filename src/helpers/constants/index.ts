import DashboardIcon from "@/components/icons/DashboardIcon";
import { NavbarLink, SidebarLink } from "../types";
import CommunityIcon from "@/components/icons/CommunityIcon";
import PlannerIcon from "@/components/icons/PlannerIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import WorkshopIcon from "@/components/icons/WorkshopIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import ListIcon from "@/components/icons/ListIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import StudentDashboardIcon from "@/components/icons/StudentDashBoardIcon";
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
    icon: ListIcon,
    href: "/list",
    label: "Home",
  },
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
  {
    icon: ErrorBookIcon,
    href: "/error-book",
    label: "Error Book",
  },
  {
    icon: GrowthMeterIcon,
    href: "/growth-meter",
    label: "Growth Meter",
  },
  {
    icon: WorkshopIcon,
    href: "/workshops",
    label: "Workshops",
  },
  {
    icon: QuizIcon,
    href: "/quizzes",
    label: "Quizzes",
  },
];

