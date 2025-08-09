import {
  BadgeCheck,
  BookOpenText,
  FilePlus,
  Home,
  Hourglass,
} from "lucide-react";

export const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    privateLink: false,
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: BookOpenText,
    privateLink: false,
  },
  {
    label: "Pending Assignments",
    href: "/pending-assignments",
    icon: Hourglass,
    privateLink: true,
  },
];

export const profileDropdown = [
  {
    label: "Create Assignment",
    href: "/create-assignment",
  },
  {
    label: "My Attempted Assignments",
    href: "/my-assignments",
  },
];
