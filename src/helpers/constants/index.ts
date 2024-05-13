import DashboardIcon from "@/components/icons/DashboardIcon";
import { NavbarLink} from "../types";
import CommunityIcon from "@/components/icons/CommunityIcon";

export const NavbarLinks: NavbarLink[] = [
  {
    label: "Mentor Dashboard",
    icon: DashboardIcon,
    href: "/",
  },
  { label: "Community", icon: CommunityIcon, href: "/community" },
];
